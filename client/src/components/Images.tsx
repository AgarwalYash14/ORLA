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
        <div className="border-x border-tertiary p-4 flex flex-col gap-4 h-full">
            <div className="flex justify-between items-center shrink-0">
                <h1>Images</h1>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        disabled={isGenerating}
                        className="flex items-center gap-1 text-secondary hover:text-secondary-dark cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="aspect-square rounded-md relative w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-200 to-blue-50 bg-[length:300%_300%] border border-tertiary/50 rounded-md"
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

            <div className="overflow-y-auto flex-1 scrollbar-hide grid gap-4">
                {images.length === 0 ? (
                    <p className="text-tertiary">No images generated yet</p>
                ) : (
                    images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className={`bg-white h-min relative p-2 rounded-md ${
                                selected === index
                                    ? 'border-2 border-secondary transition ease-in-out'
                                    : 'border-0'
                            }`}
                            onClick={() => setSelected(index)}
                        >
                            <img
                                src={imageUrl}
                                alt={`Generated ${index + 1}`}
                                className="object-contain rounded-sm"
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                            {selected === index && (
                                <div className="absolute top-0 left-0 bg-white p-2 rounded-tl-md">
                                    <BiCheck />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <button
                className="text-white bg-secondary border-secondary cursor-pointer border-2 px-5 py-2 text-base text-nowrap whitespace-nowrap hover:bg-secondary-dark rounded"
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
    )
}
