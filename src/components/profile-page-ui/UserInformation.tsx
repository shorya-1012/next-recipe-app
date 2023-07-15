"use client"

import { Follows } from '@prisma/client';
import Image from 'next/image';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios'
import { UserFollowPayload, UserUnFollowPayload } from '@/lib/apiValidators';
import { AiOutlineLoading } from 'react-icons/ai';
import { useToast } from '../ui/use-toast';

type Props = {
    authorId: string;
    followers: Follows[];
    authorImage: string;
    authorUserName: string;
    postsCount: number
}

const UserFollowButton = ({ authorId, followers, postsCount, authorImage, authorUserName }: Props) => {

    const router = useRouter()
    const { userId } = useAuth()
    const isFollowing = followers.filter(follower => follower.followerId === userId)
    const [followersCount, setFollowersCount] = useState(followers.length)
    const [following, setFollowing] = useState(isFollowing.length !== 0)
    const { toast } = useToast()

    const { mutate: followUser, isLoading } = useMutation({
        mutationFn: async () => {
            if (!following) {
                const paylaod: UserFollowPayload = {
                    followerId: userId!,
                    followingId: authorId
                }
                const { data } = await axios.post('/api/user/follow', paylaod)
                return data
            }
            const paylaod: UserUnFollowPayload = {
                id: isFollowing[0].id
            }
            const { data } = await axios.delete('/api/user/follow', { data: paylaod })
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Couldn't follow`
                    })
                    return
                }
                if (err.response?.status === 401) {
                    router.push('/sign-in')
                    return
                }
                if (err.response?.status === 403) {
                    toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: `Couldn't follow`
                    })
                    return
                }
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `Couldn't follow`
                })
            }
        },
        onSuccess: () => {
            setFollowing(prev => !prev)
            toast({
                title: 'Success',
                description: `You ${!following ? 'are now following' : 'unfollowed'} ${authorUserName}`
            })
            if (following) setFollowersCount(prev => prev - 1)
            else if (!following) setFollowersCount(prev => prev + 1)
            router.refresh()
        }
    })

    return (
        <div className="w-[90vw] mb-5 flex flex-col md:flex-row justify-center gap-8 items-center my-5">
            <div className="relative w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] my-3">
                <Image priority className="object-cover rounded-[50%]" src={authorImage || ''} alt="user image" fill={true} />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl mt-2 sm:text-3xl my-2">{authorUserName}</h1>
                    {
                        authorId !== userId &&
                        <button
                            onClick={() => {
                                if (!userId) {
                                    router.push('/sign-in')
                                    return
                                }
                                followUser()
                            }}
                            className="flex gap-x-2 bg-gray-200 hover:bg-gray-400 items-center text-gray-900 h-[30px] sm:h-[40px] px-4 rounded-xl"
                        >
                            {
                                isLoading ?
                                    <AiOutlineLoading className='animate-spin' /> :
                                    following ? <SlUserFollowing /> : <SlUserFollow />
                            }
                            <span className="mr-1">{following ? 'Following' : 'Follow'}</span>
                        </button>
                    }
                </div>
                <hr className="w-full h-px mt-3" />
                <div className="flex gap-4 text-xl mt-3 justify-around">
                    <span>{postsCount} Posts</span>
                    <span>{followersCount} Followers</span>
                </div>
            </div>
        </div>
    )
}

export default UserFollowButton