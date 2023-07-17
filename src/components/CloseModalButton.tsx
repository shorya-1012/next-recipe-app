"use client"
import {useAuth} from "@clerk/nextjs"
import {useRouter} from "next/navigation"
import {GrFormClose} from "react-icons/gr"

const CloseModalButton = () => {
    const router = useRouter()

    const handleModalClose = () => {
        router.back()
    }

    const {userId} = useAuth()

    if (userId) router.push('/')

    return (
        <button
            onClick={handleModalClose}
            className=" absolute rounded-xl mb-5 hover:border-gray-900 border-px top-4 right-4 z-0"
        >
            <GrFormClose size={30} />
        </button>
    )
}

export default CloseModalButton
