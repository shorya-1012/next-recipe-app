import CreateRecipeForm from "@/components/CreateRecipeForm";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"

export type createPostParams = {
    title: string;
    selectedCategory: string;
    ingredients: string;
    content: string;
    imageURL: string;
    visibility: string;
}

const page = async () => {

    const { userId } = auth()

    const createPost = async (details: createPostParams) => {
        "use server"
        if (!userId) {
            redirect('/')
        }
        await prisma.post.create({
            data: {
                postTitle: details.title,
                imageURL: details.imageURL,
                content: details.content,
                ingredients: details.ingredients,
                category: {
                    connect: {
                        name: details.selectedCategory
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    const categories = await prisma.category.findMany()

    return (
        <div className="bg-dark-body text-white px-5 sm:px-8 min-h-screen">
            <h1 className=" text-3xl font-righteous font-semibold mt-8 mb-3">Create A Recipe</h1>
            <span className="font-semibold">Create , Share and Learn</span>
            <CreateRecipeForm createPost={createPost} categories={categories} user={userId} />
        </div>
    )
}

export default page