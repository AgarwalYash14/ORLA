interface TechnologyCardProps {
    title: string
    description: string
    icon: string
    stat: string
    statLabel: string
    isLast: boolean
}

const TechnologyCard = ({
    title,
    description,
    icon,
    stat,
    statLabel,
    isLast,
}: TechnologyCardProps) => (
    <div
        className={`boxes border-tertiary px-12 py-16 ${isLast ? '' : 'border-b md:border-r md:border-b-0'}`}
    >
        <div className="mb-6">
            <span className="text-5xl">{icon}</span>
        </div>
        <h3 className="mb-3 text-2xl">{title}</h3>
        <p className="mb-6 text-sm text-gray-600">{description}</p>
        <div className="flex items-end justify-between">
            <span className="number text-3xl">{stat}</span>
            <span className="text-xs text-gray-500 uppercase">{statLabel}</span>
        </div>

        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
    </div>
)

export default function TechnologySection() {
    const technologies = [
        {
            title: 'AI Image Generation',
            description:
                "Using Stability AI's state-of-the-art diffusion models to create high-quality images from text descriptions.",
            icon: '🧠',
            stat: '1024×1024',
            statLabel: 'Resolution',
        },
        {
            title: '3D Model Conversion',
            description:
                "Powered by Tencent's Hunyuan3D, our technology transforms 2D images into detailed 3D models optimized for various use cases.",
            icon: '🔮',
            stat: '30s',
            statLabel: 'Avg. Processing',
        },
        {
            title: 'Low-Poly Optimization',
            description:
                'All generated models are optimized for real-time applications, games, and AR/VR experiences with clean geometry.',
            icon: '📐',
            stat: 'GLB',
            statLabel: 'Format',
        },
    ]

    return (
        <div className="border-tertiary border-b">
            <div className="border-tertiary grid grid-cols-1 border-b md:grid-cols-4">
                <div className="border-tertiary relative flex flex-col border-t md:border-t-0">
                    <div className="ring-tertiary absolute top-0 right-0 flex h-12 w-12 items-center justify-center bg-white ring">
                        <div className="ring-tertiary flex h-6 w-6 items-center justify-center rounded-[50%] ring">
                            <div className="ring-tertiary bg-tertiary h-2 w-2 rounded-[50%] ring" />
                        </div>
                    </div>
                </div>
                <div className="border-tertiary border-s-2 border-e" />
                <h1 className="font-secondary col-span-1 flex items-center justify-center bg-white px-5 py-14 text-[3.25rem] leading-[1] tracking-tighter md:col-span-2">
                    OUR TECHNOLOGY
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                {technologies.map((tech, index) => (
                    <TechnologyCard
                        key={index}
                        {...tech}
                        isLast={index === technologies.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}
