import { auth, clerkClient } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import SignOutButton from "@/components/SignOutButton"
import NoPostPage from "@/components/NoPostPage"
import UserPostPage from "./UserPostPage"

const page = async ({ params }: { params: { id: string } }) => {

    try {
        const user = await clerkClient.users.getUser(params.id)

        const { userId } = auth()

        const checkIfCurrUser = params.id === userId;

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
            <div className="min-h-screen w-screen bg-dark-body text-white flex flex-col items-center">
                <div className="w-[800px] h-[300px] flex flex-col md:flex-row justify-center items-center ">
                    <div className="relative w-[150px] h-[150px] md:mr-10 my-3">
                        <Image className="object-cover rounded-[50%]" src={user.profileImageUrl} alt="user image" fill={true} />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl mb-2">{user.firstName + ' ' + user.lastName}</h1>
                        <h2 className="text-xl mb-3">{user.emailAddresses[0].emailAddress}</h2>
                        <div className={`${checkIfCurrUser ? 'flex' : 'hidden'} w-[100%] flex justify-center`}>
                            <Link href={'/create-recipe'}>
                                <div className="w-[120px] h-[40px] flex justify-center items-center rounded-lg bg-blue-500">
                                    Create Post
                                </div>
                            </Link>
                            <SignOutButton />
                        </div>
                    </div>
                </div>
                {userPosts ? <UserPostPage checkIfCurrUser={checkIfCurrUser} userPublicPosts={userPublicPosts} userPrivatePosts={userPrivatePosts} /> : <NoPostPage />}
            </div>
        )
    } catch (error) {
        return (
            <div className="h-screen bg-dark-body text-white flex justify-center items-center">
                <h1 className="text-3xl ">User Not Found</h1>
            </div>
        )
    }


}

export default page