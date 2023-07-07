import { PostFavouriteValidator, PostUnFavouriteValidator } from "@/lib/apiValidators"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import z, { ZodError } from 'zod'
import { fromZodError } from "zod-validation-error"

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const { postId } = PostFavouriteValidator.parse(body)

        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: 'Not Authorized' }, { status: 401 })
        }

        const favourite = await prisma.favouritedPost.create({
            data: {
                postPostId: postId,
                userId
            }
        })

        return NextResponse.json({ status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            const err = fromZodError(error as ZodError)
            return NextResponse.json({ error: err }, { status: 422 })

        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}


export async function DELETE(req: Request) {

    const body = await req.json()

    try {

        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ error: 'Not Authorized' }, { status: 401 })
        }

        const { id } = PostUnFavouriteValidator.parse(body)

        await prisma.favouritedPost.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: 'Comment Unliked' }, { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const err = fromZodError(error as ZodError)
            return NextResponse.json({ error: err }, { status: 422 })

        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}