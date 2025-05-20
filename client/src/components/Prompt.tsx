import { useState } from 'react'

interface PromptProps {
    onGenerate: (prompt: string) => void
}

export default function Prompt({ onGenerate }: PromptProps) {
    const [prompt, setPrompt] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await onGenerate(prompt)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-base">Text Prompt</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Text Prompt */}
                    <div className="relative">
                        <textarea
                            rows={4}
                            value={prompt}
                            onChange={(e) => {
                                const wordCount = e.target.value
                                    .trim()
                                    .split(/\s+/)
                                    .filter(Boolean).length
                                const MAX_WORDS = 25

                                if (wordCount <= MAX_WORDS) {
                                    setPrompt(e.target.value)
                                }

                                e.target.style.height = 'auto'
                                e.target.style.height = `${Math.max(e.target.scrollHeight, 80)}px`
                            }}
                            placeholder="Describe the image you want to generate..."
                            className="ring-tertiary focus:ring-secondary h-auto w-full resize-none overflow-hidden rounded bg-neutral-300 p-3 text-sm ring transition-all duration-200 outline-none focus:ring-1"
                            disabled={isSubmitting}
                            spellCheck
                        />
                        <div className="absolute right-2 bottom-3 text-right text-xs text-gray-500">
                            {prompt.trim().split(/\s+/).filter(Boolean).length}{' '}
                            / 25 words
                        </div>
                        {prompt.length > 0 && (
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setPrompt('')}
                                disabled={isSubmitting}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="rounded-btn"
                        disabled={!prompt || isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Image'}
                    </button>
                </form>
            </div>
            <div className="border-tertiary flex w-full flex-col gap-4 border-t p-4">
                <div className="flex flex-col gap-2 rounded-lg text-justify text-sm">
                    <p className="font-medium">Tips for better results:</p>
                    <div className="space-y-1">
                        {[
                            'Be specific about the scene you want to create',
                            'Include details about style and colors',
                            "Try different approaches if you don't get the desired result",
                        ].map((tip, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="bg-secondary mt-2 h-1.5 w-1.5 flex-shrink-0" />
                                <p className="flex-1">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-justify text-xs">
                    *prompt may take a few seconds to generate, depending on the
                    complexity of the image.
                </p>
            </div>
        </div>
    )
}
