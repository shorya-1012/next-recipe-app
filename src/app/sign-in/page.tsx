import { SignIn, auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const page = () => {
    const { userId } = auth()
    if (userId) redirect('/')

    return (
        <div className="w-screen min-h-screen bg-dark-body flex justify-center items-center overflow-hidden">
            <SignIn />
        </div>
    )
}

export default page