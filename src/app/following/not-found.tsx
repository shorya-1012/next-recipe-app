import {FaUsersSlash} from "react-icons/fa"

const NotFound = () => {
    return (
        <div className="w-screen h-screen font-nunito overflow-hidden flex flex-col justify-center items-center">
            <FaUsersSlash size={100} />
            <h1 className="text-5xl font-semibold">Your are not following any one</h1>
        </div>
    )
}

export default NotFound;
