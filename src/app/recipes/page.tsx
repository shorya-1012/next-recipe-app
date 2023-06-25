import { prisma } from "@/lib/db"
import UserProfileCard from "@/components/UserProfileCard"
import { clerkClient } from "@clerk/nextjs"
import Link from "next/link"
import UserPostCard from "@/components/UserPostCard"

const page = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {

    const searchQuery = searchParams.q
    if (!searchQuery || typeof searchQuery !== 'string') {
        return (
            <div className="w-screen min-h-screen bg-dark-body text-white flex justify-center items-center">
                <h1>No Posts Found</h1>
            </div>
        )
    }

    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    first_name: {
                        contains: searchQuery,
                    }
                },
                {
                    last_name: {
                        contains: searchQuery
                    }
                }
            ]
        },
    })

    const usersWithImage = users.length !== 0 ? await Promise.all(users.map(async (user) => {
        const { imageUrl } = await clerkClient.users.getUser(user.id)
        return (
            { ...user, imageUrl }
        )
    })) : []

    const posts = await prisma.post.findMany({
        where: {
            OR: [
                {
                    postTitle: {
                        contains: searchQuery,
                    }
                },
                {
                    ingredients: {
                        contains: searchQuery,
                    }
                }
            ]
        },
        include: {
            category: true
        }
    })

    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-dark-body text-white flex flex-col items-center ">
            {usersWithImage.length !== 0 &&
                <h2 className="text-xl font-nunito font-semibold mt-10">Users : </h2>
            }
            <div className="w-screen md:w-[80%] mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"> {
                usersWithImage.map(user => {
                    return (
                        <Link href={`/user/${user.id}`} >
                            <UserProfileCard userName={user.first_name + ' ' + user.last_name} imgageURL={user.imageUrl} />
                        </Link>
                    )
                })
            }
            </div>
            <div className={`${posts.length !== 0 ? '' : 'hidden'} w-full flex flex-col items-center mt-5`}>
                <h3 className="text-xl font-nunito font-semibold">Posts</h3>
                <div className=" w-full md:w-[80%] ms-10 sm:mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        posts.map(post => {
                            return (
                                <Link href={`/recipes/${post.postId}`}>
                                    <UserPostCard key={post.postId} title={post.postTitle} imageURL={post.imageURL} categoryName={post.category[0].name} />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default page