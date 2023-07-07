import { auth, } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import SignOutButton from "@/components/profile-page-ui/SignOutButton"
import NoPostPage from "@/components/profile-page-ui/NoPostPage"
import UserPostPage from "@/components/profile-page-ui/UserPostPage"

const page = async ({ params }: { params: { id: string } }) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: params.id
            }
        })

        if (!user) {
            return (
                <div className="h-screen bg-dark-body text-white flex justify-center items-center">
                    <h1 className="text-3xl ">User Not Found</h1>
                </div>
            )
        }

        const { userId } = auth()

        const isCurrentUser = params.id === userId;

        const userPosts = await prisma.post.findMany({
            where: {
                userId: params.id
            },
            include: {
                category: true
            }
        })

        const userPublicPosts = userPosts.filter(userPost => userPost.visibility === "PUBLIC");

        const userPrivatePosts = userPosts.filter(userPost => userPost.visibility === "PRIVATE")

        return (
            <div className="min-h-screen w-screen bg-dark-body text-white flex flex-col items-center overflow-x-hidden">
                <div className="w-[800px] h-[300px] flex flex-col md:flex-row justify-center items-center ">
                    <div className="relative w-[150px] h-[150px] md:mr-10 my-3">
                        <Image priority className="object-cover rounded-[50%]" src={user?.profileImageUrl || ''} alt="user image" fill={true} />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl mb-2">{user?.first_name + ' ' + user?.last_name}</h1>
                        <div className={`${isCurrentUser ? 'flex' : 'hidden'} w-[100%] flex justify-center`}>
                            <Link href={'/create-recipe'}>
                                <div className="w-[120px] h-[40px] flex justify-center items-center rounded-lg bg-blue-500">
                                    Create Post
                                </div>
                            </Link>
                            <SignOutButton />
                        </div>
                    </div>
                </div>
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