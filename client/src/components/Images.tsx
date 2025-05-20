import { useState, useEffect } from 'react'
import { BiCheck, BiRefresh } from 'react-icons/bi'
import { IoCubeOutline } from 'react-icons/io5'

interface ImagesProps {
    images: string[]
    onGenerateModel: (
        imageUrl: string
    ) => Promise<{ status: string; error?: string }>
    isGenerating?: boolean
    onRetry?: () => void
}

export default function Images({
    images,
    onGenerateModel,
    isGenerating,
    onRetry,
}: ImagesProps) {
    const [selected, setSelected] = useState<number | null>(null)
    const [imageLoading, setImageLoading] = useState<boolean[]>([])
    const [imageErrors, setImageErrors] = useState<(string | null)[]>([])
    const [elapsedTime, setElapsedTime] = useState(0)
    const [estimatedTime] = useState(10) // Default estimated time in seconds
    const [generationError, setGenerationError] = useState<string | null>(null)

    useEffect(() => {
        if (images.length > 0) {
            setImageLoading(new Array(images.length).fill(true))
            setImageErrors(new Array(images.length).fill(null))
        }
    }, [images])

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null

        if (isGenerating) {
            // Reset timer when generation starts
            setElapsedTime(0)

            // Start the timer
            timer = setInterval(() => {
                setElapsedTime((prev) => prev + 0.1)
            }, 100)
        } else if (timer) {
            // Clear timer when generation ends
            clearInterval(timer)
        }

        // Cleanup
        return () => {
            if (timer) clearInterval(timer)
        }
    }, [isGenerating])

    const handleGenerate = async () => {
        setGenerationError(null)
        if (selected !== null && images[selected]) {
            const imageUrl = images[selected]
            if (
                imageUrl &&
                typeof imageUrl === 'string' &&
                imageUrl.startsWith('http://localhost:8000/static/images/')
            ) {
                onGenerateModel(imageUrl)
            } else {
                console.error('Invalid image URL selected:', imageUrl)
            }
        }
    }

    const handleRetryClick = () => {
        if (onRetry) {
            // Reset selection and errors when retrying
            setSelected(null)
            setGenerationError(null)
            // Call the onRetry function passed as prop
            onRetry()
        }
    }

    const handleImageLoad = (index: number) => {
        setImageLoading((prev) => {
            const newState = [...prev]
            newState[index] = false
            return newState
        })
        setImageErrors((prev) => {
            const newState = [...prev]
            newState[index] = null
            return newState
        })
    }

    const handleImageError = (index: number) => {
        setImageLoading((prev) => {
            const newState = [...prev]
            newState[index] = false
            return newState
        })
        setImageErrors((prev) => {
            const newState = [...prev]
            newState[index] = 'Failed to load image'
            return newState
        })
    }

    const isAnyImageLoading = imageLoading.some((loading) => loading)

    // Calculate progress percentage (capped at 99% until complete)
    const progressPercentage = isGenerating
        ? Math.min((elapsedTime / estimatedTime) * 100, 99)
        : 100

    // Format the time display (show 1 decimal place)
    const formatTime = (time: number) => time.toFixed(1)

    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex shrink-0 items-center justify-between">
                    <h1>Images</h1>
                    {onRetry && (
                        <button
                            onClick={handleRetryClick}
                            disabled={isGenerating}
                            className="text-secondary hover:text-secondary-dark flex cursor-pointer items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Regenerate images"
                        >
                            <BiRefresh
                                className={`text-xl ${
                                    isGenerating ? 'animate-spin' : ''
                                }`}
                            />
                            <span>Retry</span>
                        </button>
                    )}
                </div>

                {isGenerating && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                        <div className="border-tertiary absolute inset-0 rounded-md border bg-gradient-to-r from-blue-50 to-neutral-200">
                            {/* Progress bar with subtle pulse effect */}
                            <div
                                className="h-full bg-gradient-to-r from-blue-200 to-blue-300 opacity-70 transition-all duration-100"
                                style={{
                                    width: `${progressPercentage}%`,
                                    animation: 'pulse 2s infinite ease-in-out',
                                }}
                            />
                            {/* Animated cube icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <IoCubeOutline className="animate-bounce text-4xl text-blue-600 opacity-80" />
                            </div>
                            <div className="absolute bottom-3 left-3 animate-pulse text-xs font-medium text-gray-800">
                                Generating Image...
                            </div>
                            <div className="absolute right-3 bottom-3 text-xs font-medium text-gray-800">
                                {formatTime(elapsedTime)} /{' '}
                                {formatTime(estimatedTime)} sec
                            </div>
                        </div>
                    </div>
                )}

                {!isGenerating && images.length === 0 ? (
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                        <div className="border-tertiary absolute inset-0 rounded-md border bg-neutral-300">
                            <div className="flex h-full flex-col items-center justify-center">
                                <p className="mb-2 text-center text-sm text-gray-600">
                                    No images generated yet
                                </p>
                                <p className="text-center text-xs text-gray-500">
                                    Write a prompt to generate images
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    !isGenerating &&
                    images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className={`relative h-min rounded-md transition-all duration-100 ${
                                selected === index
                                    ? 'border-secondary border-2 bg-white p-2'
                                    : 'border-tertiary/50 border'
                            }`}
                            onClick={() => setSelected(index)}
                        >
                            {/* Show loading gradient per image */}
                            {imageLoading[index] && (
                                <div
                                    className="border-tertiary/50 absolute inset-0 rounded-md border bg-gradient-to-br from-blue-50 via-blue-200 to-blue-50 bg-[length:300%_300%]"
                                    style={{
                                        animation:
                                            'gradientFlow 4s ease infinite',
                                    }}
                                />
                            )}
                            {/* Show error message if image failed to load */}
                            {imageErrors[index] && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-red-100 text-sm text-red-700">
                                    {imageErrors[index]}
                                </div>
                            )}
                            {!imageErrors[index] && (
                                <img
                                    src={imageUrl}
                                    alt={`Generated ${index + 1}`}
                                    className="relative z-10 rounded-sm object-contain"
                                    onLoad={() => handleImageLoad(index)}
                                    onError={() => handleImageError(index)}
                                />
                            )}
                            {selected === index && (
                                <div className="absolute top-0 left-0 z-20 rounded-tl-md bg-white p-2">
                                    <BiCheck />
                                </div>
                            )}
                        </div>
                    ))
                )}

                <button
                    className="rounded-btn"
                    onClick={handleGenerate}
                    disabled={
                        selected === null ||
                        (images.length > 0 &&
                            (!images[selected] ||
                                !images[selected]?.startsWith(
                                    'http://localhost:8000/static/images/'
                                ))) ||
                        isGenerating
                    }
                >
                    {isGenerating ? 'Generating...' : 'Generate Model'}
                </button>
            </div>
            <div className="border-tertiary h-full w-full border-t px-4 pt-4 text-sm text-gray-600">
                Select an image above and click "Generate Model" to create a 3D
                model from your chosen image. The process may take a few moments
                to complete.
            </div>
            <style>{`
                @keyframes gradientFlow {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </>
    )
}
