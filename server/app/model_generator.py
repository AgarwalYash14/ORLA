import asyncio
from gradio_client import Client, handle_file
from typing import Dict, Any
import os
import logging
import requests
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def generate_3d_model_async(image_url: str, task_id: str) -> Dict[str, Any]:
    """Generate a 3D model file using tencent/Hunyuan3D-2 Gradio API."""
    try:
        logger.info(f"Starting 3D model generation for task_id: {task_id}")

        # Convert image URL to file path
        img_path = image_url.replace("http://localhost:8000/", "app/")
        if not os.path.exists(img_path):
            raise ValueError(f"Image not found at {img_path}")

        # Initialize Gradio client
        huggingface_token = os.getenv("HUGGINGFACE_API_TOKEN", "")
        client = Client("tencent/Hunyuan3D-2", hf_token=huggingface_token if huggingface_token else None)

        # Record start time
        start_time = time.time()

        # Submit the /shape_generation job
        job = client.submit(
            image=handle_file(img_path),
            check_box_rembg=True,
            steps=30, 
            guidance_scale=5,
            seed=1234,
            octree_resolution=256,  # Optimized for faster processing
            num_chunks=8000,  # Optimized to lower memory usage
            randomize_seed=True,
            api_name="/shape_generation"
        )

        # Wait for the job to complete with a 5-minute timeout
        logger.info(f"Submitted job for task_id: {task_id}")
        try:
            result = await asyncio.wait_for(
                asyncio.get_event_loop().run_in_executor(None, job.result),
                timeout=300.0  # 5 minutes
            )
        except asyncio.TimeoutError:
            logger.error(f"Job timed out after 300 seconds for task_id: {task_id}")
            raise TimeoutError("The read operation timed out")

        # Log duration and raw result
        duration = time.time() - start_time
        logger.info(f"API call completed in {duration:.2f} seconds for task_id: {task_id}")
        logger.info(f"Raw API result for task_id {task_id}: {result}")

        # Extract the model filepath
        model_filepath = None
        if isinstance(result, (list, tuple)) and len(result) > 0:
            # Check result[0] for dictionary with 'value'
            if isinstance(result[0], dict) and 'value' in result[0] and isinstance(result[0]['value'], str) and result[0]['value'].endswith('.glb'):
                model_filepath = result[0]['value']
            # Try result[0] directly if it's a string
            elif isinstance(result[0], str) and result[0].endswith('.glb'):
                model_filepath = result[0]
            # Try result[1] for possible alternative output
            elif len(result) > 1 and isinstance(result[1], str) and result[1].endswith('.glb'):
                model_filepath = result[1]
        elif isinstance(result, str) and result.endswith('.glb'):
            model_filepath = result

        if not model_filepath:
            raise ValueError(f"Gradio API returned invalid model filepath: {result}")

        # Ensure the filepath is a full URL
        if not model_filepath.startswith('http'):
            model_filepath = f"https://tencent-hunyuan3d-2.hf.space/file={model_filepath}"
        logger.info(f"Extracted model filepath for task_id {task_id}: {model_filepath}")

        # Download the model file
        logger.info(f"Downloading model from {model_filepath} for task_id: {task_id}")
        model_response = requests.get(model_filepath, timeout=30)
        model_response.raise_for_status()

        # Ensure output directory exists
        os.makedirs("app/static/models", exist_ok=True)
        model_path = f"app/static/models/{task_id}.glb"

        # Save the model file as GLB
        with open(model_path, "wb") as f:
            f.write(model_response.content)

        # Generate model URL
        model_url = f"http://localhost:8000/static/models/{task_id}.glb"

        # Prepare response
        final_response = {
            "status": "success",
            "model_url": model_url,
            "model": "tencent/Hunyuan3D-2",
            "usage": {
                "input_tokens": None,
                "output_tokens": None,
                "total_tokens": None
            },
            "task_id": task_id
        }

        logger.info(f"Completed 3D model generation for task_id {task_id}")
        return final_response

    except Exception as e:
        error_response = {
            "status": "error",
            "error": str(e),
            "error_type": type(e).__name__,
            "task_id": task_id
        }
        logger.error(f"Error in 3D model generation for task_id {task_id}: {str(e)}")
        return error_response

def generate_3d_model(image_url: str, task_id: str) -> Dict[str, Any]:
    """Synchronous wrapper for the async generate_3d_model function."""
    return asyncio.run(generate_3d_model_async(image_url, task_id))