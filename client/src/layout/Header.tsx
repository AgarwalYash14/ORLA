import { logo } from "../assets";

export default function Header() {
    return (
        <>
            <div className="relative flex justify-between h-20">
                <div>
                    <div className="nav-triangle-wrapper nav-triangle-wrapper-left">
                        <div className="nav-triangle nav-triangle-left"></div>
                    </div>
                </div>
                <div className="border-tertiary flex h-20 w-[97%] items-center justify-between border-b">
                    <div className="flex h-full w-1/4 items-center gap-3">
                        <img src={logo} className="h-10" alt="" />
                        <div className="flex flex-col">
                            <h1 className="font-tertiary text-2xl leading-[0.8] font-light uppercase">
                                ORLA
                            </h1>
                            <h1 className="font-secondary text-2xl leading-[0.8] uppercase">
                                BLUE
                            </h1>
                        </div>
                    </div>
                    <div className="border-tertiary flex h-full w-1/2 items-center justify-center gap-8 border-x text-sm tracking-wider">
                        <h1>Home</h1>
                        <h1>Generate</h1>
                        <h1>How ORLA works</h1>
                        <h1>Technology</h1>
                        <h1>Community</h1>
                        <h1>Docs</h1>
                    </div>
                    <div className="flex w-1/4 items-center justify-end gap-8 text-sm">
                        <h1>Login</h1>
                        <button className="polygon bg-secondary hover:bg-primary border-secondary cursor-pointer border-2 px-5 py-2 text-base text-nowrap whitespace-nowrap uppercase transition-all duration-300 ease-in-out">
                            Get started
                        </button>
                    </div>
                </div>
                <div>
                    <div className="nav-triangle-wrapper nav-triangle-wrapper-right">
                        <div className="nav-triangle nav-triangle-right"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
