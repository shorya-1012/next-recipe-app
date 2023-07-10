import UserPostCard from "@/components/UserPostCard"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Link from "next/link"

const page = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
        return
    }

    const favouritedPostsList = await prisma.favouritedPost.findMany({
        where: {
            userId
        },
        select: {
            post: {
                include: {
                    user: true
                }
            }
        }
    })


    return (
        <div className="w-screen overflow-x-hidden flex flex-col items-center">
            <span className="text-2xl font-nunito my-5">Your Favourites :</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-2 ">
                {
                    favouritedPostsList.map(favPost => {
                        return (
                            <div key={favPost.post.postId}>
                                <Link href={`/recipes/${favPost.post.postId}`}>
                                    <UserPostCard
                                        key={favPost.post.postId}
                                        title={favPost.post.postTitle}
                                        postImageURL={favPost.post.imageURL}
                                        authorImageUrl={favPost.post.user.profileImageUrl}
                                        authorUserName={favPost.post.user.first_name + ' ' + favPost.post.user.last_name}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default page