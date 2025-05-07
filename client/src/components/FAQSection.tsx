interface FAQItemProps {
    question: string
    answer: string
    hasBorderRight: boolean
}

const FAQItem = ({ question, answer, hasBorderRight }: FAQItemProps) => (
    <div
        className={`border-tertiary border-b p-8 ${hasBorderRight ? 'md:border-r' : ''}`}
    >
        <h3 className="mb-4 text-xl">{question}</h3>
        <p className="text-sm text-gray-600">{answer}</p>
    </div>
)

export default function FAQSection() {
    const faqs = [
        {
            question: 'What kind of 3D models can ORLA create?',
            answer: 'ORLA specializes in creating low-poly 3D models suitable for games, applications, and various digital environments. The models are optimized for real-time rendering.',
        },
        {
            question: 'How accurate is the text-to-3D conversion?',
            answer: 'ORLA uses advanced AI to interpret your text descriptions. While results may vary depending on the complexity and clarity of the prompt, we continually improve our algorithms for better accuracy.',
        },
        {
            question: 'What file formats are supported?',
            answer: 'Currently, ORLA generates models in GLB format, which is widely compatible with most 3D software and game engines.',
        },
        {
            question: 'Do I own the models I create with ORLA?',
            answer: "Yes, you retain full ownership of any models generated using ORLA. You're free to use them in your projects, commercially or non-commercially.",
        },
    ]

    return (
        <div>
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
                    FAQ
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        hasBorderRight={index % 2 === 0}
                    />
                ))}
            </div>
        </div>
    )
}
