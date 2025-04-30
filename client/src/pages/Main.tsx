import Hero from './Hero'

export default function Main() {
    return (
        <>
            <div className="z-40 flex justify-between">
                <div className="border-tertiary w-[4%] border-r" />
                <div className="border-tertiary relative h-[calc(100vh-5rem)] w-[92%] overflow-hidden">
                    <Hero />
                </div>
                <div className="border-tertiary w-[4%] border-l" />
            </div>
        </>
    )
}
