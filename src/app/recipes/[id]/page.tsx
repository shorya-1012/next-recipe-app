import { prisma } from "@/lib/db"
import { auth, clerkClient } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const page = async ({ params }: { params: { id: string } }) => {
    const postDetails = await prisma.post.findUnique({
        where: {
            postId: params.id
        },
        include: {
            user: true,
            category: true
        }
    })

    if (!postDetails) {
        return (
            <div className="w-screen h-screen flex justify-center items-center text-3xl font-nunito text-center">
                <h1>Post does not exist</h1>
            </div>
        )
    }
    const { userId } = auth()
    const authorDetails = await clerkClient.users.getUser(postDetails?.userId!)

    const isAuthor = userId === postDetails?.userId

    if (postDetails?.visibility === "PRIVATE") {
        if (!isAuthor) {
            return (
                <div className="w-screen h-screen overflow-hidden bg-dark-body text-white flex flex-col justify-center items-center">
                    <h1 className="text-3xl mb-3">401 Unautorized</h1>
                    <p>This is a private post</p>
                </div>
            )
        }
    }

    return (
        <div className="min-h-screen overflow-x-hidden white flex flex-col items-start font-nunito">
            <div className="flex flex-col md:flex-row mt-10">
                <div id="image-holder" className="relative w-[350px] h-[200px] md:w-[420px] md:h-[300px] lg:w-[500px] lg:h-[350px] overflow-hidden mx-5 md:mx-10">
                    <Image className="object-cover rounded-lg" src={postDetails?.imageURL!} alt="recipe image" fill={true} priority />
                </div>
                <div className="flex flex-col justify-start mx-5 mt-5">
                    <h1 className="text-xl font-semibold lg:text-5xl md:my-5">{postDetails?.postTitle}</h1>
                    <Link href={`/user/${authorDetails.id}`}>
                        <div className="flex items-center mt-5 md:mb-5">
                            <div className="w-[45px] relative h-[45px] rounded-[50%] overflow-hidden mr-3">
                                <Image src={authorDetails.imageUrl} alt="profile image" fill={true} className=" object-cover" />
                            </div>
                            <span className="text-xl">{authorDetails.firstName + ' ' + authorDetails.lastName}</span>
                        </div>
                    </Link>
                    <div className="flex items-center mt-3">
                        <span className="mr-3 text-xl">Categories : </span>
                        <Link href={`/search?q=${postDetails?.category[0].name}`}>
                            <p className="rounded-full w-max py-1 px-2 text-md bg-blue-500">{postDetails?.category[0].name}</p>
                        </Link>
                    </div>
                </div>
            </div>
            <section className="flex flex-col lg:flex-row lg:justify-around lg:items-start w-screen my-10 px-3">
                <div className="lg:w-[60%] px-5 py-5 order-2 lg:order-1 ms-2 sm:ms-5 lg:ms-0">
                    <h2 className="text-3xl font-bold text-blue-400">Instructions :</h2>
                    <div className="text-lg pt-5" dangerouslySetInnerHTML={{ __html: postDetails?.content! }} />
                </div>
                <div className="lg:w-[30%] px-3 py-5 ms-7 sm:ms-10 lg:ms-0 order-1 lg:order-2">
                    <span className="text-3xl font-bold text-blue-400">Ingredients :</span>
                    <div className="text-lg pt-5" dangerouslySetInnerHTML={{ __html: postDetails?.ingredients! }} />
                </div>
            </section>
        </div>
    )
}

export default page