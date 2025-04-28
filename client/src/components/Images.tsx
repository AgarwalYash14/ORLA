import { useState } from 'react'
import { BiCheck, BiRefresh } from 'react-icons/bi'

interface ImagesProps {
    images: string[]
    onGenerateModel: (imageUrl: string) => void
    isGenerating?: boolean
    onRetry?: () => void
}

export default function Images({
    images,
    onGenerateModel,
    isGenerating = false,
    onRetry,
}: ImagesProps) {
    const [selected, setSelected] = useState<number | null>(null)
    const [imageLoading, setImageLoading] = useState(true)

    const handleGenerate = () => {
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

    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex shrink-0 items-center justify-between">
                    <h1>Images</h1>
                    {onRetry && (
                        <button
                            onClick={onRetry}
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

                {(isGenerating || (imageLoading && images.length > 0)) && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                        <div
                            className="border-tertiary/50 absolute inset-0 rounded-md border bg-gradient-to-br from-blue-50 via-blue-200 to-blue-50 bg-[length:300%_300%]"
                            style={{
                                animation: 'gradientFlow 4s ease infinite',
                            }}
                        />
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
                    </div>
                )}

                <div className="scrollbar-hide grid gap-4 overflow-y-auto">
                    {images.length === 0 ? (
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
                        images.map((imageUrl, index) => (
                            <div
                                key={index}
                                className={`border-tertiary relative h-min rounded-md border-1 bg-white p-2 ${
                                    selected === index
                                        ? 'border-secondary border-2 transition ease-in-out'
                                        : 'border-0'
                                }`}
                                onClick={() => setSelected(index)}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`Generated ${index + 1}`}
                                    className="rounded-sm object-contain"
                                    onLoad={() => setImageLoading(false)}
                                    onError={() => setImageLoading(false)}
                                />
                                {selected === index && (
                                    <div className="absolute top-0 left-0 rounded-tl-md bg-white p-2">
                                        <BiCheck />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <button
                    className="rounded-btn"
                    onClick={handleGenerate}
                    disabled={
                        selected === null ||
                        !images[selected] ||
                        !images[selected]?.startsWith(
                            'http://localhost:8000/static/images/'
                        )
                    }
                >
                    Generate Model
                </button>
            </div>
            <div className="border-tertiary h-full w-full border-t pt-4"></div>
        </>
    )
}
