from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from app.tasks import process_image_task, generate_model_task

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
os.makedirs("app/static/images", exist_ok=True)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Pydantic model for request validation
class GenerateModelRequest(BaseModel):
    imageUrl: str

@app.post("/generate-images")
async def generate_images(prompt: str = Form(None), image: UploadFile = File(None)):
    if not prompt and not image:
        raise HTTPException(status_code=400, detail="Prompt or image required")

    task_id = str(os.urandom(16).hex())  # Unique task ID
    image_path = None

    if image:
        # Save uploaded image
        contents = await image.read()
        image_path = f"app/static/images/{task_id}_original.png"
        with open(image_path, "wb") as f:
            f.write(contents)

    try:
        # Offload processing to Celery
        task = process_image_task.delay(prompt or "", image_path, task_id)
        result = task.get(timeout=30)  # Wait for task completion
        return JSONResponse(content={"images": result["images"]})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")

@app.post("/generate-3d-model")
async def generate_3d_model(request: GenerateModelRequest):
    image_url = request.imageUrl
    if not image_url:
        raise HTTPException(status_code=422, detail="imageUrl is required")
    if not isinstance(image_url, str):
        raise HTTPException(status_code=422, detail="imageUrl must be a string")
    if not image_url.startswith("http://localhost:8000/static/images/"):
        raise HTTPException(status_code=422, detail="imageUrl must start with http://localhost:8000/static/images/")

    # Check if the image file exists
    img_path = image_url.replace("http://localhost:8000/", "app/")
    if not os.path.exists(img_path):
        raise HTTPException(status_code=404, detail=f"Image not found at {img_path}")

    task_id = str(os.urandom(16).hex())
    try:
        task = generate_model_task.delay(image_url, task_id)
        result = task.get(timeout=30)
        return JSONResponse(content={"model": result["model"]})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"3D model generation failed: {str(e)}")