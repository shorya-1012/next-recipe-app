"use client"
import { useRouter } from "next/navigation"
import { GrFormClose } from "react-icons/gr"

const CloseModalButton = () => {
    const router = useRouter()

    const handleModalClose = () => {
        router.back()
    }

    return (
        <button onClick={handleModalClose} className=" absolute top-4 right-4">
            <GrFormClose size={30} />
        </button>
    )
}

export default CloseModalButton