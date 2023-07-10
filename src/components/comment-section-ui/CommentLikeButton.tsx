'use client'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { CommentLikePayload } from '@/lib/apiValidators'
import { useRouter } from 'next/navigation'
import { CommentLike } from '@prisma/client'
import { useAuth } from '@clerk/nextjs'

type Props = {
    commentId: string,
    commentLikes: CommentLike[]
}

const CommentLikeButton = ({ commentId, commentLikes }: Props) => {

    const { userId } = useAuth()
    const [likeCount, setLikeCount] = useState(commentLikes.length)
    const isLiked = commentLikes.filter(comment => comment.userId === userId)
    const [liked, setLiked] = useState(isLiked.length !== 0)
    const router = useRouter()

    const { mutate: handleCommentLike } = useMutation({
        mutationFn: async () => {
            const payload: CommentLikePayload = {
                commentCommentId: commentId
            }

            if (liked) {
                const { data } = await axios.post('/api/post/comment/like', payload)
                return data
            }

            const { data } = await axios.delete('/api/post/comment/like', { data: payload })
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                setLiked(prev => !prev)
                liked ? setLikeCount(prev => prev + 1) : setLikeCount(prev => prev - 1)
                if (err.response?.status === 422) {
                    Swal.fire(
                        "Couldn't Like comment",
                        "Some error occured",
                        "error"
                    )
                    return
                }
                if (err.response?.status === 401) {
                    router.push('/sign-in')
                    return
                }
                Swal.fire(
                    "Couldn't Like comment",
                    "Some error occured",
                    "error"
                )
            }
        },
        onSuccess: () => {
            router.refresh()
        }
    })

    return (
        <div className="flex items-center hover:font-semibold mt-3 text-sm text-gray-500 gap-1">
            <button onClick={() => {
                if (!userId) {
                    router.push('/sign-in')
                    return
                }
                setLiked(prev => !prev)
                liked ? setLikeCount(prev => prev - 1) : setLikeCount(prev => prev + 1)
                handleCommentLike()
            }}>
                {liked ? <FcLike /> : <FcLikePlaceholder />}
            </button>
            <p>{likeCount}</p>
        </div>
    )
}

export default CommentLikeButton