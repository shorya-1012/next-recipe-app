import {HeartOff} from "lucide-react"

const NotFound = () => {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center font-nunito">
            <HeartOff size={'120px'} />
            <h1 className="text-5xl font-semibold">You have not favourited any posts</h1>
        </div>
    )
}

export default NotFound;

