import {prisma} from "@/lib/db"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/Avatar"
import UserPostCard from "@/components/UserPostCard"
import {auth} from "@clerk/nextjs"
import Link from "next/link"
import {notFound, redirect} from "next/navigation"

const page = async () => {

    const {userId} = auth()

    if (!userId) {
        redirect('/')
    }

    const followedAccounts = await prisma.follows.findMany({
        where: {
            followerId: userId
        },
        include: {
            following: true
        }
    })

    if (followedAccounts.length === 0) {
        notFound()
    }

    const followingAccountId = followedAccounts.map(acc => acc.followingId)

    const followingPosts = await prisma.post.findMany({
        where: {
            userId: {
                in: followingAccountId
            },
            visibility: 'PUBLIC'
        },
        include: {
            user: true
        }
    })

    return (
        <div className="w-screen overflow-x-hidden flex flex-col items-center">
            <div className="flex gap-6 place-self-start px-5 pb-3 mx-2 my-5 overflow-x-scroll border-b-[1px] w-full border-gray-500 scrollbar-hide">
                {
                    followedAccounts.map(account => {
                        return (
                            <Link key={account.id} href={`/user/${account.following.id}`}>
                                <div className="flex flex-col items-center gap-2">
                                    <Avatar className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
                                        <AvatarImage src={account.following.profileImageUrl || ''} />
                                        <AvatarFallback>{account.following.first_name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span>{account.following.first_name + ' ' + account.following.last_name}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-2">
                {
                    followingPosts.map(post => {
                        return (
                            <div key={post.postId}>
                                <Link href={`/recipes/${post.postId}`}>
                                    <UserPostCard
                                        key={post.postId}
                                        title={post.postTitle}
                                        postImageURL={post.imageURL}
                                        authorImageUrl={post.user.profileImageUrl}
                                        authorUserName={post.user.first_name + ' ' + post.user.last_name}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default page
