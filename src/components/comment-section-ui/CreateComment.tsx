"use client"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { CreateCommentPayload } from "@/lib/apiValidators"
import { AiOutlineLoading } from "react-icons/ai"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

type Props = {
    postId: string
    replyToId?: string
}

const CreateComment = ({ postId, replyToId }: Props) => {

    const [userComment, setUserComment] = useState('')
    const router = useRouter()

    const { mutate: createComment, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: CreateCommentPayload = {
                postId: postId,
                text: userComment
            }

            const { data } = await axios.post('/api/post/comment', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    Swal.fire(
                        "Couldn't create post",
                        "The title should contain between 3 and 25 characters",
                        "error"
                    )
                    return
                }
                if (err.response?.status === 401) {
                    Swal.fire(
                        "Couldn't create post",
                        "Your are not authorized to create a post",
                        "error"
                    )
                    return
                }
                Swal.fire(
                    "Couldn't create post",
                    "Some error occured",
                    "error"
                )
            }
        },
        onSuccess: () => {
            setUserComment('')
            router.refresh()
        }
    })

    const handlePostComment = async (e: React.FormEvent) => {
        e.preventDefault()
        createComment()
    }

    return (
        <form onSubmit={handlePostComment} className="w-full md:w-[80%]">
            <textarea
                onChange={(e) => setUserComment(e.target.value)}
                value={userComment}
                placeholder="Share your thoughts..."
                rows={2}
                className="w-full bg-dark-highlights rounded-2xl shadow-2xl px-3 py-5 my-3" />
            <button
                className="hover:bg-white hover:text-black ms-2 mt-2 rounded border-white text-white w-[180px] px-3 py-1 border-[1px]">
                {isLoading ?
                    <div className="flex h-full items-center justify-center py-1 pr-2 gap-2">
                        <AiOutlineLoading className="animate-spin" size={20} />
                        <p>Submitting</p>
                    </div>
                    : 'Submit'}
            </button>

        </form>
    )
}

export default CreateComment