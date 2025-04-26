import { useState } from 'react'
import { BiCheck } from 'react-icons/bi'

interface ImagesProps {
    images: string[]
    onGenerateModel: (imageUrl: string) => void
}

export default function Images({ images, onGenerateModel }: ImagesProps) {
    const [selected, setSelected] = useState<number | null>(null)

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
            <h1 className="shrink-0">Images</h1>
            <div className="overflow-y-auto flex-1 scrollbar-hide grid gap-4">
                {images.length === 0 ? (
                    <p className="text-tertiary">No images generated yet</p>
                ) : (
                    images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className={`bg-white aspect-square p-4 rounded-md flex items-center justify-center relative ${
                                selected === index
                                    ? 'border-2 border-secondary transition ease-in-out'
                                    : 'border-0'
                            }`}
                            onClick={() => setSelected(index)}
                        >
                            <img
                                src={imageUrl}
                                alt={`Generated ${index + 1}`}
                                className="object-contain w-full h-full aspect-square"
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
