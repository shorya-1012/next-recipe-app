"use client"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { CreateCommentPayload } from "@/lib/apiValidators"
import { AiOutlineLoading } from "react-icons/ai"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

type Props = {
    postId: string
    replyToId?: string
}

const CreateComment = ({ postId, replyToId }: Props) => {

    const [userComment, setUserComment] = useState('')
    const router = useRouter()

    const { toast } = useToast()

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
                    toast({
                        variant: 'destructive',
                        title: "Couldn't add comment",
                        description: "Comment should contain atleast 2 character"
                    })
                    return
                }
                if (err.response?.status === 401) {
                    router.push('/sign-in')
                    return
                }
                toast({
                    variant: 'destructive',
                    title: "Couldn't add comment",
                    description: "Your comment could not be added"
                })
            }
        },
        onSuccess: () => {
            toast({
                title: 'Comment added successfully',
                description: "Your comment was added successfully"
            })
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