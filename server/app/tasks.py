from celery import Celery
import os
import logging
import time
from PIL import Image
import io
from huggingface_hub import InferenceClient
from app.model_generator import generate_3d_model

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Celery("tasks", broker=os.getenv("CELERY_BROKER_URL"), backend=os.getenv("CELERY_RESULT_BACKEND"))

@app.task(bind=True, max_retries=3)
def process_image_task(self, prompt: str, image_path: str | None, task_id: str):
    images = []
    
    if prompt or image_path:
        api_token = os.getenv("HF_TOKEN")
        if not api_token:
            raise ValueError("HF_TOKEN not set in environment")

        # Initialize InferenceClient with fal-ai provider
        client = InferenceClient(
            provider="fal-ai",
            api_key=api_token,
        )

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

        logger.info(f"Generating image with prompt: {enhanced_prompt}")
        try:
            # Measure request time
            start_time = time.time()
            # Generate image using InferenceClient
            image = client.text_to_image(
                prompt=enhanced_prompt,
                model="stabilityai/stable-diffusion-3.5-large-turbo",
                width=1024,
                height=1024,
                num_inference_steps=4,
                guidance_scale=0.0,
            )
            logger.info(f"Image generated in {time.time() - start_time} seconds")

            # Process and save the image
            if image.size != (1024, 1024):
                image = image.resize((1024, 1024), Image.Resampling.LANCZOS)
            filename = f"app/static/images/{task_id}_0.png"
            image.save(filename)
            images.append(f"http://localhost:8000/static/images/{os.path.basename(filename)}")
        except Exception as e:
            logger.error(f"Error generating image: {str(e)}")
            if "429" in str(e).lower():
                logger.warning(f"Rate limit hit, retrying...")
                time.sleep(2)
                raise self.retry(countdown=2)
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