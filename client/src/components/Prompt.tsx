import { useRef, useState } from 'react'

interface PromptProps {
    onGenerate: (prompt: string, image: File | null) => void
}

export default function Prompt({ onGenerate }: PromptProps) {
    const [prompt, setPrompt] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onGenerate(prompt, null) // Pass null for image since upload is removed
    }

    return (
        <div className="p-4 flex flex-col gap-4 h-full">
            <h1 className="text-base">Text Prompt</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Text Prompt */}
                <div className="relative">
                    <textarea
                        rows={4}
                        value={prompt}
                        onChange={(e) => {
                            setPrompt(e.target.value)
                            e.target.style.height = 'auto'
                            e.target.style.height = `${e.target.scrollHeight}px`
                        }}
                        placeholder="Describe improvements (e.g., Change the car's color to red and make it more angular)"
                        className="text-sm w-full h-auto overflow-hidden resize-none p-2 outline-none border border-tertiary rounded focus:ring-1 focus:ring-secondary"
                    />
                </div>

                {/* Generate Button */}
                <button
                    type="submit"
                    className="text-white bg-secondary border-secondary cursor-pointer border-2 px-5 py-2 text-base text-nowrap whitespace-nowrap hover:bg-secondary-dark rounded uppercase"
                    disabled={!prompt}
                >
                    Generate
                </button>
            </form>
        </div>
    )
}
