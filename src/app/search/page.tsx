import { prisma } from "@/lib/db"
import Link from "next/link"
import SearchPostCard from "@/components/search-page-ui/SearchPostCard"
import SearchUserCard from "@/components/search-page-ui/SearchUserCard"

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
                },
            ]
        },
        include: {
            follower: true
        }
    })

    const posts = await prisma.post.findMany({
        where: {
            visibility: 'PUBLIC',
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
                },
                {
                    category: {
                        some: {
                            name: {
                                contains: searchQuery
                            }
                        }
                    }
                }
            ]
        },
        include: {
            user: true
        }
    })

    return (
        <div className="w-screen min-h-screen overflow-x-hidden flex flex-col items-start">
            <h1 className="mt-5 text-xl italic px-5 ms-1">showing search results for "{searchQuery}"</h1>
            <div className={`${users.length !== 0 ? '' : 'hidden'} ms-2 px-5 w-full mt-5`}>
                <h2 className="text-xl ms-1 mb-4 md:text-2xl font-nunito font-semibold mt-10">Users : </h2>
                {
                    users.map(user => {
                        return (
                            <Link href={`/user/${user.id}`}>
                                <SearchUserCard
                                    key={user.id}
                                    userName={user.first_name + ' ' + user.last_name}
                                    userProfilePicUrl={user.profileImageUrl || ''}
                                    followerCount={user.follower.length}
                                />
                            </Link>
                        )
                    })
                }
            </div>
            <div className={`${posts.length !== 0 ? '' : 'hidden'} ms-2 px-5 w-full mt-5`}>
                <h3 className="text-xl md:text-2xl mb-2 font-nunito font-semibold">Posts</h3>
                {
                    posts.map(post => {
                        return (
                            <Link href={`/recipes/${post.postId}`}>
                                <SearchPostCard
                                    key={post.postId}
                                    title={post.postTitle}
                                    postImageURL={post.imageURL}
                                    authorImageUrl={post.user.profileImageUrl || ''}
                                    authorUserName={post.user.first_name + ' ' + post.user.last_name}
                                />
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default page