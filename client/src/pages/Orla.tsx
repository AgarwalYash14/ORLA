import Images from '../components/Images'
import Model from '../components/Model'
import Prompt from '../components/Prompt'

export default function Orla() {
    return (
        <>
            <div className="grid w-full grid-cols-7">
                <div className="col-span-3 flex w-full">
                    <div className="w-full">
                        <Prompt />
                    </div>
                    <div className="w-full">
                        <Images />
                    </div>
                </div>
                <div className="col-span-4 w-full border border-tertiary">
                    <Model />
                </div>
            </div>
        </>
    )
}
