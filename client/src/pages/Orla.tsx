import Images from '../components/images'
import Model from '../components/model'
import Prompt from '../components/prompt'

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
                <div className="col-span-4 w-full border">
                    <Model />
                </div>
            </div>
        </>
    )
}
