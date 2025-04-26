import Marquee from "react-fast-marquee";

export default function Hero() {
    return (
        <>
            <div className="flex flex-col items-center overflow-hidden">
                <div className="border-tertiary h-16 w-[calc(50%+52px)] border-x" />
                <div className="relative flex w-full justify-center">
                    <div className="border-tertiary absolute h-full w-[calc(50%+52px)] border-x" />
                    <div className="bg-secondary absolute top-4 left-4 h-3 w-3" />
                    <Marquee
                        speed={50}
                        gradient={false}
                        className="font-secondary marquee border-tertiary border-y pt-6 pb-10 text-[10rem] leading-[1] uppercase"
                    >
                        <span className="px-6" />
                        Type. Build. Render.
                    </Marquee>
                    <div className="absolute bottom-4 left-4 flex items-center gap-6 uppercase">
                        <div className="bg-secondary h-3 w-3" />
                        <h1 className="text-sm">Type. Build. Render.</h1>
                    </div>
                </div>
            </div>
            <div></div>
        </>
    );
}
