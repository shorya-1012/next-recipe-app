import CloseModalButton from "@/components/CloseModalButton"
import {SignIn} from "@clerk/nextjs"

const page = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center fixed inset-0 bg-zinc-900/20 z-10'>
            <div className="bg-white rounded-xl flex items-center w-lg mx-auto">
                <div className="relative bg-white text-black w-full h-fit py-10 px-3 rounded-xl">
                    <div className="my-3">
                        <CloseModalButton />
                    </div>
                    <SignIn />
                </div>
            </div>
        </div>
    )
}

export default page
