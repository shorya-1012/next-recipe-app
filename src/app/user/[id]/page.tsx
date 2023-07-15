import { auth, } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import NoPostPage from "@/components/profile-page-ui/NoPostPage"
import UserPostPage from "@/components/profile-page-ui/UserPostPage"
import UserInformation from "@/components/profile-page-ui/UserInformation"

const page = async ({ params }: { params: { id: string } }) => {

    try {

        const author = await prisma.user.findUnique({
            where: {
                id: params.id
            },
            include: {
                follower: true,
                posts: {
                    include: {
                        category: true
                    }
                }
            }
        })

        if (!author) {
            return (
                <div className="h-screen bg-dark-body text-white flex justify-center items-center">
                    <h1 className="text-3xl ">User Not Found</h1>
                </div>
            )
        }

        const { userId } = auth()

        const isCurrentUser = params.id === userId;

        const userPosts = author.posts

        const userPublicPosts = userPosts.filter(userPost => userPost.visibility === "PUBLIC");

        const userPrivatePosts = userPosts.filter(userPost => userPost.visibility === "PRIVATE")

        return (
            <div className="min-h-screen w-screen flex flex-col items-center overflow-x-hidden font-nunito">
                <UserInformation
                    authorUserName={author.first_name + ' ' + author.last_name}
                    authorId={author.id}
                    authorImage={author.profileImageUrl || ''}
                    followers={author.follower}
                    postsCount={author.posts.length}
                />
                {userPosts.length !== 0 ? <UserPostPage checkIfCurrUser={isCurrentUser} userPublicPosts={userPublicPosts} userPrivatePosts={userPrivatePosts} /> : <NoPostPage />}
            </div>
        )
    } catch (error) {
        console.log(error)
        return (
            <div className="h-screen bg-dark-body text-white flex justify-center items-center">
                <h1 className="text-3xl ">User Not Found</h1>
            </div>
        )
    }


}

export default page