import { CreateCommentValidator } from "@/lib/apiValidators";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";
import z, { ZodError } from "zod"

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized to post comment' }, { status: 401 });
        }

        const { postId, text, replyToId } = CreateCommentValidator.parse(body)

        const comment = await prisma.comment.create({
            data: {
                text,
                authorId: userId,
                postsId: postId,
                replyToId
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