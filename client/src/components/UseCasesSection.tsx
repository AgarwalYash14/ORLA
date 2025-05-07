interface UseCaseCardProps {
    title: string
    description: string
    icon: string
    index: number
    total: number
}

const UseCaseCard = ({
    title,
    description,
    icon,
    index,
    total,
}: UseCaseCardProps) => {
    const getBorderClasses = () => {
        // Complex logic for border classes based on position in grid
        const isLastRow = index >= total - 2
        const isLast = index === total - 1
        const isSecondToLast = index === total - 2

        return `border-tertiary h-full px-12 py-16 ${index < total - 1 ? 'md:border-r' : ''} ${
            index < total - 2
                ? 'border-b lg:border-b-0'
                : isSecondToLast
                  ? 'border-b lg:border-b-0'
                  : ''
        }`
    }

    return (
        <div className="boxes">
            <div className={getBorderClasses()}>
                <div className="mb-4 text-5xl">{icon}</div>
                <h3 className="mb-3 text-xl">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <span className="corner top-left"></span>
            <span className="corner top-right"></span>
            <span className="corner bottom-left"></span>
            <span className="corner bottom-right"></span>
        </div>
    )
}

export default function UseCasesSection() {
    const useCases = [
        {
            title: 'Game Development',
            description:
                'Quickly create assets for games, from characters to environments.',
            icon: '🎮',
        },
        {
            title: 'Product Design',
            description:
                'Rapidly prototype physical products and generate concept models.',
            icon: '🏭',
        },
        {
            title: 'Education',
            description:
                'Create visual 3D models to enhance learning experiences.',
            icon: '🎓',
        },
        {
            title: 'AR/VR Content',
            description: 'Build immersive experiences with custom 3D objects.',
            icon: '🥽',
        },
    ]

    return (
        <div className="border-tertiary border-b">
            <div className="border-tertiary grid grid-cols-1 border-b md:grid-cols-4">
                <h1 className="font-secondary border-tertiary col-span-1 flex items-center justify-center border-e bg-white px-5 py-14 text-[3.25rem] leading-[1] tracking-tighter md:col-span-2">
                    USE CASES
                </h1>
                <div className="border-tertiary relative flex flex-col border-e-2 md:border-t-0">
                    <div className="ring-tertiary absolute top-0 right-0 flex h-12 w-12 items-center justify-center bg-white ring">
                        <div className="ring-tertiary flex h-6 w-6 items-center justify-center rounded-[50%] ring">
                            <div className="ring-tertiary bg-tertiary h-2 w-2 rounded-[50%] ring" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {useCases.map((useCase, index) => (
                    <UseCaseCard
                        key={index}
                        {...useCase}
                        index={index}
                        total={useCases.length}
                    />
                ))}
            </div>
        </div>
    )
}
