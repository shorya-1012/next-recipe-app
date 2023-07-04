import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { apiPostRequestValidator } from "@/lib/apiHandlers"
import { fromZodError } from 'zod-validation-error'
import { ZodError } from "zod"
import z from "zod"

export async function POST(req: Request) {
    const body = await req.json()
    try {
        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ error: 'You are unauthorized to create a post' }, { status: 401 })
        }

        const { title, imageURL, content, ingredients, visibility, selectedCategory } = apiPostRequestValidator.parse(body)

        const post = await prisma.post.create({
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

        return NextResponse.json({ id: post.postId }, { status: 200 })


    } catch (error) {
        if (error instanceof z.ZodError) {
            const err = fromZodError(error as ZodError)
            return NextResponse.json({ error: err }, { status: 422 })

        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
