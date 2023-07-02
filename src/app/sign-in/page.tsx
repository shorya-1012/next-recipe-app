import { SignIn } from "@clerk/nextjs"

const page = () => {
    return (
        <div className="w-screen min-h-screen bg-dark-body flex justify-center items-center overflow-hidden">
            <SignIn />
        </div>
    )
}

export default page