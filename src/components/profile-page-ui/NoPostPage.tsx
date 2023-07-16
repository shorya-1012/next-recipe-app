import {TfiFaceSad} from "react-icons/tfi"
import {CameraOff} from "lucide-react"

const NoPostPage = () => {
    return (
        <div className="w-screen min-h-[50vh] bg-dark-body text-gray-200 mt-10">
            <div className="flex flex-col w-full h-full items-center">
                <div className="mb-5">
                    <CameraOff size={'100px'} />
                </div>
                <div>
                    <h2 className="text-3xl font-righteous">No Posts Yet.</h2>
                </div>
            </div>
        </div>
    )
}

export default NoPostPage
