import { BsArrowRight } from 'react-icons/bs'

interface WorkflowStepProps {
    number: string
    title: string
    description: string
    icon: string
    isLast?: boolean
}

const WorkflowStep = ({
    number,
    title,
    description,
    icon,
    isLast = false,
}: WorkflowStepProps) => (
    <div className="boxes border-tertiary relative border-b px-12 py-16 first:border-s-0 last:border-s md:border-s-2">
        <div className="mb-6 flex items-start justify-between">
            <span className="text-6xl">{icon}</span>
            <span className="font-secondary text-5xl">{number}</span>
        </div>
        <h3 className="mb-3 text-2xl tracking-tighter">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>

        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>

        {!isLast && (
            <div className="ring-tertiary absolute right-0 bottom-0 hidden bg-white p-3 ring md:block">
                <BsArrowRight className="text-2xl text-black number" />
            </div>
        )}
    </div>
)

export default function Workflow() {
    const workflowSteps = [
        {
            number: '01',
            title: 'Type',
            description:
                'Describe what you want to create in natural language. Our AI understands complex ideas and artistic direction.',
            icon: '💬',
        },
        {
            number: '02',
            title: 'Generate',
            description:
                "Our AI generates high-quality images based on your text prompt using Stability AI's state-of-the-art diffusion models.",
            icon: '🖼️',
        },
        {
            number: '03',
            title: 'Select',
            description:
                'Choose your favorite generated image that best captures your vision. You can regenerate if needed.',
            icon: '👆',
        },
        {
            number: '04',
            title: 'Transform',
            description:
                "Convert your 2D image into a detailed 3D model with a single click using Tencent's Hunyuan3D technology.",
            icon: '🔄',
        },
    ]

    return (
        <>
            <div className="border-tertiary grid grid-cols-1 border-y md:grid-cols-4">
                <h1 className="font-secondary border-tertiary col-span-1 flex items-center justify-center border-e bg-white px-5 py-14 text-[3.25rem] leading-[1] tracking-tighter md:col-span-2">
                    HOW ORLA WORKS ?
                </h1>
                <div className="border-tertiary relative flex flex-col border-t md:border-t-0 md:border-r-2">
                    <div className="ring-tertiary absolute top-0 right-0 flex h-12 w-12 items-center justify-center bg-white ring">
                        <div className="ring-tertiary flex h-6 w-6 items-center justify-center rounded-[50%] ring">
                            <div className="ring-tertiary bg-tertiary h-2 w-2 rounded-[50%] ring" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {workflowSteps.map((step, index) => (
                    <WorkflowStep
                        key={index}
                        {...step}
                        isLast={index === workflowSteps.length - 1}
                    />
                ))}
            </div>
        </>
    )
}
