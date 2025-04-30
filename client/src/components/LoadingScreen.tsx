import { useEffect, useState } from 'react'

interface LoadingScreenProps {
    finishLoading: () => void
}

export default function LoadingScreen({ finishLoading }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [counterOpacity, setCounterOpacity] = useState(1)
    const [showCutout, setShowCutout] = useState(false)

    // Simulate loading
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 10, 100))
        }, 300)

        return () => clearInterval(interval)
    }, [])

    // When loading completes
    useEffect(() => {
        if (progress >= 100) {
            const fadeCounter = setTimeout(() => {
                setCounterOpacity(0)

                const revealBoxes = setTimeout(() => {
                    setShowCutout(true)

                    const done = setTimeout(() => {
                        finishLoading()
                    }, 1000)

                    return () => clearTimeout(done)
                }, 500)

                return () => clearTimeout(revealBoxes)
            }, 300)

            return () => clearTimeout(fadeCounter)
        }
    }, [progress, finishLoading])

    const getDigit = (pos: number): string => {
        const rounded = Math.floor(progress / 10) * 10
        if (pos === 0) return rounded >= 100 ? '1' : '0'
        if (pos === 1)
            return rounded >= 100 ? '0' : Math.floor(rounded / 10).toString()
        return (rounded % 10).toString()
    }

    const rows = 2
    const cols = 8
    const totalBoxes = rows * cols
    const boxDelays = Array.from(
        { length: totalBoxes },
        () => Math.floor(Math.random() * 6) * 0.15
    )

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden bg-black">
            {/* Counter Display */}
            <div
                className="absolute inset-0 grid grid-cols-4 px-14 text-white transition-opacity duration-500"
                style={{ opacity: counterOpacity }}
            >
                {[0, 1, 2].map((pos) => (
                    <div
                        key={pos}
                        className="font-secondary ring-tertiary flex h-full items-end justify-center text-[20rem] leading-[1] ring-[0.5px]"
                    >
                        {getDigit(pos)}
                    </div>
                ))}
                <div className="ring-tertiary h-full ring-[0.5px]" />
            </div>

            {/* Cutout Grid Animation */}
            {showCutout && (
                <div
                    className="absolute inset-0 grid"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                    }}
                >
                    {boxDelays.map((delay, i) => (
                        <div
                            key={i}
                            className="bg-white"
                            style={{
                                animation: `cutoutFade 0.6s ease-out ${delay}s forwards`,
                            }}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes cutoutFade {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}
