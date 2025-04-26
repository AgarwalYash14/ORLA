import Hero from "./Hero";

export default function Main() {
    return (
        <>
            <div className="z-40 flex min-h-screen justify-between">
                <div className="border-tertiary w-[5%] border-r" />
                <div className="border-tertiary w-[90%]">
                    <Hero />
                </div>
                <div className="border-tertiary w-[5%] border-l" />
            </div>
        </>
    );
}
