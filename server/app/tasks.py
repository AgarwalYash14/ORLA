from celery import Celery
import os
import requests
import logging
import time
from PIL import Image
import io
import random
from app.model_generator import generate_3d_model

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Celery("tasks", broker=os.getenv("CELERY_BROKER_URL"), backend=os.getenv("CELERY_RESULT_BACKEND"))

@app.task(bind=True, max_retries=3)
def process_image_task(self, prompt: str, image_path: str | None, task_id: str):
    images = []
    
    if prompt or image_path:
        api_token = os.getenv("HUGGINGFACE_API_TOKEN")
        if not api_token:
            raise ValueError("HUGGINGFACE_API_TOKEN not set in environment")

        api_url = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3.5-large-turbo"
        headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json",
        }

        base_prompt = prompt or "Improve the uploaded image"
        enhanced_prompt = (
            f"{base_prompt}, full object clearly visible, low-poly style with sharp, defined edges, "
            f"isolated on a solid white background, uniform soft lighting with minimal shadows, "
            f"flat and simple textures with no gradients, front-facing 360-degree reference view, "
            f"all parts distinct and non-overlapping, no transparency or reflections, "
            f"low detail level with basic shapes, clean and solid geometric forms, "
            f"entire object centered in frame, optimized for 3D modeling reference, "
            f"high contrast between object and background, no intricate patterns or noise"
        )
        
        payload = {
            "inputs": enhanced_prompt,
            "parameters": {
                "num_inference_steps": 4,
                "guidance_scale": 0.0,
                "width": 1024,
                "height": 1024,
            }
        }

        logger.info(f"Sending request to {api_url} with prompt: {enhanced_prompt}")
        try:
            response = requests.post(api_url, headers=headers, json=payload, timeout=300)
            response.raise_for_status()
            logger.info(f"Received response from {api_url} in {response.elapsed.total_seconds()} seconds")
            image_bytes = response.content
            try:
                image = Image.open(io.BytesIO(image_bytes))
                if image.size != (1024, 1024):
                    image = image.resize((1024, 1024), Image.Resampling.LANCZOS)
                filename = f"app/static/images/{task_id}_0.png"
                image.save(filename)
                images.append(f"http://localhost:8000/static/images/{os.path.basename(filename)}")
            except Exception as e:
                logger.error(f"Error processing image: {str(e)}")
                raise
        except requests.exceptions.HTTPError as e:
            logger.error(f"HTTP error: {str(e)} - Response: {response.text if 'response' in locals() else 'No response'}")
            if response.status_code == 503:
                logger.warning(f"503 error from {api_url}, retrying...")
                time.sleep(2)
                raise self.retry(countdown=2)
            else:
                raise
        except requests.exceptions.RequestException as e:
            logger.error(f"Error with Hugging Face API: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error processing image: {str(e)}")
            raise

    return {"images": images}

@app.task(bind=True, max_retries=3)
def generate_model_task(self, image_url: str, task_id: str):
    try:
        result = generate_3d_model(image_url, task_id)
        return result
    except Exception as e:
        if str(e).startswith("429"):
            logger.warning(f"Rate limit hit for task_id {task_id}, retrying...")
            raise self.retry(countdown=30)
        raise