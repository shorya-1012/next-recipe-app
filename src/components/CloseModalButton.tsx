"use client"
import {useRouter} from "next/navigation"
import {GrFormClose} from "react-icons/gr"

const CloseModalButton = () => {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className=" absolute rounded-xl mb-5 hover:border-gray-900 border-px top-3 right-4 z-0"
        >
            <GrFormClose size={30} />
        </button>
    )
}

export default CloseModalButton
