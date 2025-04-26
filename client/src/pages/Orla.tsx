import axios from 'axios'
import Images from '../components/Images'
import Model from '../components/Model'
import Prompt from '../components/Prompt'
import { useState } from 'react'

export default function Orla() {
    const [generatedImages, setGeneratedImages] = useState<string[]>([])
    const [modelData, setModelData] = useState<{ model_url: string } | null>(
        null
    )
    const [error, setError] = useState<string | null>(null)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [isLoadingModel, setIsLoadingModel] = useState(false)
    const [lastPrompt, setLastPrompt] = useState<string>('')

    const handleGenerateImages = async (prompt: string) => {
        setError(null)
        setIsLoadingImage(true)
        setLastPrompt(prompt)
        try {
            const formData = new FormData()
            if (prompt) formData.append('prompt', prompt)

            const response = await axios.post(
                'http://localhost:8000/generate-images',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 600000,
                }
            )
            setGeneratedImages(response.data.images || [])
            setModelData(null)
        } catch (error: unknown) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.detail || 'Failed to generate images'
                : 'Failed to generate images'
            setError(errorMessage)
            console.error(
                'Error generating images:',
                axios.isAxiosError(error)
                    ? error.response?.data || error
                    : error
            )
        } finally {
            setIsLoadingImage(false)
        }
    }

    const handleRetry = () => {
        if (lastPrompt) {
            handleGenerateImages(lastPrompt)
        }
    }

    const handleGenerateModel = async (imageUrl: string) => {
        if (
            !imageUrl ||
            typeof imageUrl !== 'string' ||
            !imageUrl.startsWith('http://localhost:8000/static/images/')
        ) {
            setError('Please select a valid image to generate a 3D model')
            console.error('Invalid imageUrl:', imageUrl)
            return
        }

        setError(null)
        setIsLoadingModel(true)
        try {
            console.log('Sending 3D model request with imageUrl:', imageUrl)
            const response = await axios.post(
                'http://localhost:8000/generate-3d-model',
                { imageUrl },
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 600000, // 10 minutes
                }
            )
            console.log('Model API response:', response.data)
            setModelData(response.data)
        } catch (error: unknown) {
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.detail || 'Failed to generate 3D model'
                : 'Failed to generate 3D model'
            setError(errorMessage)
            console.error(
                'Error generating 3D model:',
                axios.isAxiosError(error)
                    ? error.response?.data || error
                    : error
            )
        } finally {
            setIsLoadingModel(false)
        }
    }

    return (
        <>
            <div className="mx-auto h-[calc(100vh-5rem)] relative w-[97%] flex">
                <div className="w-1/2 flex overflow-hidden">
                    <div className="w-full">
                        <Prompt onGenerate={handleGenerateImages} />
                    </div>
                    <div className="w-full">
                        <Images
                            images={generatedImages}
                            onGenerateModel={handleGenerateModel}
                            isGenerating={isLoadingImage}
                            onRetry={handleRetry}
                        />
                    </div>
                </div>
                <div className="w-1/2 overflow-hidden">
                    <Model modelData={modelData} />
                    {isLoadingModel && (
                        <div className="flex justify-center items-center mt-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                            <span className="ml-2 text-tertiary">
                                Generating 3D model...
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {error && (
                <div className="fixed bottom-4 left-4 bg-red-500 text-white p-4 rounded">
                    {error}
                </div>
            )}
        </>
    )
}
