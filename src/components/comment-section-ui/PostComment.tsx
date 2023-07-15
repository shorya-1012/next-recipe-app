"use client"

import { Comment, CommentLike, User } from "@prisma/client"
import Image from "next/image"
import moment from "moment"
import { FiMessageSquare } from 'react-icons/fi'
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { useAuth } from "@clerk/nextjs"
import { AiOutlineLoading } from "react-icons/ai"
import { useMutation } from "@tanstack/react-query"
import { CreateCommentPayload } from "@/lib/apiValidators"
import axios, { AxiosError } from "axios"
import CommentLikeButton from "./CommentLikeButton"
import { useToast } from "../ui/use-toast"
import { Toast } from "../ui/toast"


type ExtendedComment = Comment & {
    author: User;
    CommentLike: CommentLike[]
}

type Props = {
    comment: ExtendedComment
}

const PostComment = ({ comment }: Props) => {

    const router = useRouter()
    const [reply, setReply] = useState('')
    const [isReplying, setIsReplying] = useState(false)
    const { userId } = useAuth()
    const { toast } = useToast()

    const { mutate: addReply, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: CreateCommentPayload = {
                postId: comment.postsId,
                text: reply,
                replyToId: comment.replyToId ?? comment.commentId
            }
            const { data } = await axios.post('/api/post/comment', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast({
                        variant: 'destructive',
                        title: "Couldn't create comment",
                        description: "Comment should have atleast 2 characters"
                    })
                    return
                }
                if (err.response?.status === 401) {
                    router.push('/sign-in')
                    return
                }
            }
            toast({
                variant: 'destructive',
                title: "Couldn't create comment",
                description: "Some error occured"
            })
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Reply added successfully'
            })
            setIsReplying(false)
            setReply('')
            router.refresh()
        }
    })

    const handleReplyAddition = async (e: React.FormEvent) => {
        e.preventDefault()
        addReply()
    }

    return (
        <div className="flex flex-col items-start ms-3 my-5">
            <div className="flex gap-x-2 items-end">
                <div className="relative w-[40px] h-[40px] rounded-[50%] overflow-hidden">
                    <Image src={comment.author.profileImageUrl || ''} alt="pfp" fill={true} sizes="100%" />
                </div>
                <div className="flex gap-x-4 items-center ms-2">
                    <p className="text-xl font-nunito font-semibold">{comment.author.first_name + ' ' + comment.author.last_name}</p>
                    <p className=" text-sm text-gray-500 font-nunito">&#x2022; {moment(new Date(comment.createdAt)).fromNow()}</p>
                </div>
            </div>
            <div className="mt-4 ms-1 max-w-[80%] md:max-w-[60%]">
                <p className="text-lg font-nunito">{comment.text}</p>
            </div>
            <div className="flex gap-4 items-center">
                <CommentLikeButton commentLikes={comment.CommentLike} commentId={comment.commentId} />
                <button
                    className="text-sm text-gray-500 items-center mt-3 flex gap-x-2"
                    onClick={() => {
                        if (!userId) {
                            router.push('/sign-in')
                            return
                        }
                        setIsReplying(true)
                    }}
                >
                    <FiMessageSquare size={15} />
                    <p className=" font-nunito">Reply</p>
                </button>
            </div>
            {
                isReplying &&
                <div className="w-[80%]">
                    <textarea
                        onChange={(e) => setReply(e.target.value)}
                        value={reply}
                        placeholder="Add a reply..."
                        rows={2}
                        autoFocus={true}
                        className="w-full bg-dark-highlights rounded-2xl shadow-2xl px-3 py-5 my-3" />
                    <div className="flex gap-x-2 items-center justify-end">
                        <button
                            onClick={() => setIsReplying(false)}
                            tabIndex={-1}
                            className="hover:bg-gray-500 hover:text-white ms-2 mt-1 rounded border-gray-500 text-gray-500 text-xs w-[100px] px-2 py-1 border-[1px]">
                            Cancel
                        </button>
                        <button
                            onClick={handleReplyAddition}
                            className="hover:bg-white hover:text-black ms-2 mt-1 rounded border-white text-white text-xs w-[100px] px-2 py-1 border-[1px] self-end">
                            {isLoading ?
                                <div className="flex h-full items-center justify-center py-1 pr-1 gap-1">
                                    <AiOutlineLoading className="animate-spin" size={5} />
                                    <p>Submitting</p>
                                </div>
                                : 'Submit'}
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostComment