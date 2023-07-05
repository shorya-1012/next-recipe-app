import CloseModalButton from "@/components/CloseModalButton"
import { SignIn } from "@clerk/nextjs"

const page = () => {
    return (
        <div className="fixed inset-0 z-10 bg-zinc-950/40">
            <div className="container flex items-center h-full max-w-lg mx-auto">
                <div className="relative bg-white text-black w-full h-fit py-10 px-3 rounded-lg">
                    <CloseModalButton />
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default page