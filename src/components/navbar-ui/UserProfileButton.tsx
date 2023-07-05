import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"

type Props = {
    userId: string | null | undefined
}

const UserProfileButton = ({ userId }: Props) => {

    const { data: userPorfileImage, isLoading } = useQuery(['getProileImage'], async () => {
        const { data } = await axios.get('/api/get-current-user-profile-pic')
        return data.imageUrl
    })


    return (
        <div className='flex text-center h-full items-center'>
            <Link href={`user/${userId}`}>
                <div className="w-[40px] h-[40px] relative rounded-[50%] overflow-hidden">
                    {
                        isLoading &&
                        <div className="w-full h-full animate-pulse bg-gray-500 overflow-hidden"></div>
                    }
                    {
                        userPorfileImage &&
                        <Image fill={true} priority={true} src={userPorfileImage} className="" alt="pfp" sizes="100%" />
                    }
                </div>
            </Link>
        </div>
    )
}

export default UserProfileButton