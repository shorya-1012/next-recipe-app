import {HeartOff} from "lucide-react"

const NotFound = () => {
    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center font-nunito mb-10">
            <HeartOff size={'120px'} />
            <div className="px-4 text-center mt-10">
                <h1 className="text-2xl font-semibold">You have no favourite posts</h1>
            </div>
        </div>
    )
}

export default NotFound;

