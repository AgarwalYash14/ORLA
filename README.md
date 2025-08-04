<div align="center">
  <img src="client/public/logo.png" alt="ORLA Logo" width="150" height="auto">
  <div>
    <h1>ORLA</h1>
    <p><i>AI-Powered 3D Model Generator</i></p>

  ![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Agarwalyash14.Orla)
  ![GitHub stars](https://img.shields.io/github/stars/Agarwalyash14/Orla)
  ![GitHub forks](https://img.shields.io/github/forks/Agarwalyash14/Orla)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  </div>
  <p align="center">
    <a href="#features">Features</a> •
    <a href="#screenshots">Screenshots</a> •
    <a href="#technology-stack">Technology</a> •
    <a href="#getting-started">Get Started</a>
  </p>
  <hr>
</div>

ORLA is a web application that transforms text prompts into detailed 3D models using advanced AI technologies. With an intuitive interface and powerful backend, ORLA enables users to generate high-quality 3D assets quickly and easily.

## Screenshots

<div align="center">
  <img src="client/public/homepage.png" alt="ORLA Homepage" width="800" height="auto">
  <p><i>ORLA Homepage with main interface</i></p>
</div>

## Features

- **Text-to-3D Generation**: Create 3D models from textual descriptions
- **Image-to-3D Conversion**: Transform 2D images into detailed 3D models
- **Interactive 3D Viewer**: Examine and interact with generated models in real-time
- **Multiple Output Images**: View various angles and renderings of your 3D creation
- **User-Friendly Interface**: Modern, responsive design built with React and TypeScript

## Technology Stack

### Frontend
- **React 19** with TypeScript
- **Three.js** with React Three Fiber for 3D rendering
- **Tailwind CSS** for styling
- **Vite** as the build tool and development server

### Backend
- **FastAPI** for RESTful API endpoints
- **Celery** for asynchronous task processing
- **Redis** for task queue management
- **Stable Diffusion 3.5** AI model for image generation
- **Hunyuan3D-2** AI model for 3D model creation
- **Docker** for containerization

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Docker and Docker Compose
- Hugging Face API token (for accessing the Hunyuan3D-2 model)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AgarwalYash14/ORLA.git
   cd ORLA
   ```

2. **Set up the frontend**
   ```bash
   cd client
   npm install
   ```

3. **Set up the backend**
   ```bash
   cd ../server
   ```

4. **Set environment variables**
   Create a `.env` file in the server directory:
   ```
   HUGGINGFACE_API_TOKEN=your_token_here
   ```

5. **Start the application with Docker**
   ```bash
   docker-compose up --build
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Enter a text prompt** describing the 3D model you want to generate (e.g., "a futuristic sports car")
2. **Click "Generate"** and wait for the AI to process your request through Stability AI's image generation API
3. **Review the generated image** optimized for 3D conversion (with white background and clear object definition)
4. **Select the image** to initiate 3D model creation through Hunyuan3D-2
5. **Interact with your 3D model** using mouse controls (orbit to rotate, scroll to zoom, right-click to pan)

## Image Generation Process

ORLA uses advanced AI models to generate 3D assets through a multi-step process:

1. **Text Prompt Processing**: Your text prompt is enhanced with specific parameters optimized for 3D modeling
2. **AI Image Generation**: The backend uses Stability AI's Stable Diffusion 3.5 Large Turbo model to generate high-quality 2D renders
3. **Image Optimization**: Generated images are processed with specific attributes (isolated objects, solid background, uniform lighting, etc.)
4. **3D Model Creation**: Selected 2D images are transformed into 3D models using Tencent's Hunyuan3D-2 neural network model
5. **Real-time Visualization**: The 3D model is rendered in the browser using Three.js for interactive viewing

The technical workflow includes:
- Text prompts sent to FastAPI endpoints
- Enhanced prompts include specifications for optimal 3D conversion (low-poly style, sharp edges, white background, etc.)
- Celery workers process the requests asynchronously with Stable Diffusion API
- Generated images are saved and served from the server's static directory
- Selected images are processed by Hunyuan3D-2 to create detailed 3D models
- Redis manages the task queue for efficient processing of multiple requests

## Project Structure

```
ORLA/
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   └── src/
│       ├── assets/        # Images and other assets
│       ├── components/    # React components
│       ├── layout/        # Layout components
│       └── pages/         # Page components
└── server/                # Backend FastAPI application
    ├── app/
    │   ├── main.py        # FastAPI application
    │   ├── tasks.py       # Celery tasks
    │   └── model_generator.py # 3D model generation
    ├── Dockerfile         # Docker configuration
    └── docker-compose.yml # Docker Compose configuration
```

## Development

### Running the Frontend Locally
```bash
cd client
npm run dev
```

### Running the Backend Locally
```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload
```

In a separate terminal:
```bash
# Start Redis
docker run -p 6379:6379 redis
# Start Celery worker
cd server
celery -A app.tasks worker --loglevel=info
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Stable Diffusion 3.5](https://huggingface.co/stabilityai/stable-diffusion-3.5-large-turbo) by Stability AI for image generation
- [Hunyuan3D-2](https://huggingface.co/tencent/Hunyuan3D-2) by Tencent for the 3D model generation
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for 3D rendering in React
- [FastAPI](https://fastapi.tiangolo.com/) for the backend API
