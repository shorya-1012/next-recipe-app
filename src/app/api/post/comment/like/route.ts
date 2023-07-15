import { CommentLikeValidator } from "@/lib/apiValidators"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import z, { ZodError } from 'zod'
import { fromZodError } from "zod-validation-error"

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const { commentCommentId } = CommentLikeValidator.parse(body)

        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: 'Not Authorized' }, { status: 401 })
        }

        const isAlreadyLiked = await prisma.commentLike.findMany({
            where: {
                commentCommentId,
                userId
            }
        })

        if (isAlreadyLiked.length !== 0) {
            return NextResponse.json({ error: "Can't like the same comment twice" }, { status: 403 })
        }

        const like = await prisma.commentLike.create({
            data: {
                userId,
                commentCommentId
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

        const { commentCommentId } = CommentLikeValidator.parse(body)

        await prisma.commentLike.deleteMany({
            where: {
                commentCommentId,
                user: {
                    id: userId
                }
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