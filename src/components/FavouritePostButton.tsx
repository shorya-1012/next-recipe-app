'use client'
import { useAuth } from "@clerk/nextjs"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Swal from "sweetalert2"
import { FavouritedPost } from "@prisma/client"
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { PostFavouritePayload } from "@/lib/apiValidators"

type Props = {
    postId: string;
    postFavourites: FavouritedPost[]
}

const FavouritePostButton = ({ postId, postFavourites }: Props) => {
    const { userId } = useAuth()
    const router = useRouter()
    const isFavourited = postFavourites.filter(favoirite => favoirite.userId === userId)
    const [favouritesCount, setFavoritesCount] = useState(postFavourites.length)
    const [favoirite, setFavourited] = useState(isFavourited.length !== 0)

    const { mutate: handlePostFavourite } = useMutation({
        mutationFn: async () => {
            const payload: PostFavouritePayload = {
                postId: postId
            }
            if (favoirite) {
                const { data } = await axios.post('/api/post/like', payload)
                return data
            }
            const { data } = await axios.delete('/api/post/like', { data: payload })
            return data
        },
        onError: (err) => {
            setFavourited(prev => !prev)
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    Swal.fire(
                        "Couldn't favourite post",
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
                    "Couldn't favourite post",
                    "Some error occured",
                    "error"
                )
                return
            }
        },
        onSuccess: () => {
            router.refresh()
        }
    })

    return (
        <div className="flex items-center hover:font-semibold mt-2 gap-1">
            <button onClick={() => {
                if (!userId) {
                    router.push('/sign-in')
                    return
                }
                setFavourited(prev => !prev)
                favoirite ? setFavoritesCount(prev => prev - 1) : setFavoritesCount(prev => prev + 1)
                handlePostFavourite()
            }}>
                {favoirite ? <HiStar fill="yellow" size={25} /> : <HiOutlineStar size={25} />}
            </button>
            <p className="text-lg text-gray-200">{favouritesCount} Favourites</p>
        </div>
    )
}

export default FavouritePostButton