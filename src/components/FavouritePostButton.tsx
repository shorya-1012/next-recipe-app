'use client'
import { useAuth } from "@clerk/nextjs"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Swal from "sweetalert2"
import { FavouritedPost } from "@prisma/client"
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { AiOutlineLoading } from "react-icons/ai"
import { PostFavouritePayload, PostUnfavouritePayload } from "@/lib/apiValidators"

type Props = {
    postId: string;
    postFavourites: FavouritedPost[]
}

const FavouritePostButton = ({ postId, postFavourites }: Props) => {
    const { userId } = useAuth()
    const router = useRouter()
    const isFavourited = postFavourites.filter(favoirite => favoirite.userId === userId)
    const [favoirite, setFavourited] = useState(isFavourited.length !== 0)

    const { mutate: handleCommentLike, isLoading } = useMutation({
        mutationFn: async () => {
            if (!favoirite) {
                const payload: PostFavouritePayload = {
                    postId: postId
                }
                const { data } = await axios.post('/api/post/like', payload)
                return data
            }

            const payload: PostUnfavouritePayload = {
                id: isFavourited[0].id
            }
            const { data } = await axios.delete('/api/post/like', { data: payload })
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
                    router.push('/sign-in')
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
            setFavourited(prev => !prev)
            router.refresh()
        }
    })

    return (
        <div className="flex items-center hover:font-semibold mt-2 gap-1">
            <button onClick={() => handleCommentLike()}>
                {isLoading ? <AiOutlineLoading className='animate-spin' /> : favoirite ? <HiStar fill="yellow" size={25} /> : <HiOutlineStar size={25} />}
            </button>
            <p className="text-lg text-gray-200">{postFavourites.length} Favourites</p>
        </div>
    )
}

export default FavouritePostButton