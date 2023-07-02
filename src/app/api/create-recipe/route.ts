import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { apiPostRequestValidator } from "@/lib/apiHandlers"
import { fromZodError } from 'zod-validation-error'
import { ZodError } from "zod"

export async function POST(req: Request) {
    const body = await req.json()
    try {
        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ status: 401 })
        }

        try {
            const { title, imageURL, content, ingredients, visibility, selectedCategory } = apiPostRequestValidator.parse(body)

            await prisma.$transaction([
                prisma.post.create({
                    data: {
                        postTitle: title,
                        imageURL: imageURL,
                        content: content,
                        ingredients: ingredients,
                        visibility: visibility,
                        category: {
                            connect: {
                                name: selectedCategory
                            }
                        },
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                })
            ])

            return NextResponse.json({ status: 200 })
        } catch (error) {
            const err = fromZodError(error as ZodError)
            console.log(err)
            return NextResponse.json({ error: err }, { status: 422 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
