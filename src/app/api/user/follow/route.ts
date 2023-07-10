import { UserFollowValidator, UserUnFollowValidator } from "@/lib/apiValidators"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import z, { ZodError } from 'zod'
import { fromZodError } from "zod-validation-error"

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const { followerId, followingId } = UserFollowValidator.parse(body)

        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: 'Not Authorized' }, { status: 401 })
        }

        if (followingId === userId) {
            return NextResponse.json({ error: 'cant follow yourself' }, { status: 403 })
        }

        const isAlreadyFollowing = await prisma.follows.findMany({
            where: {
                followerId,
                followingId
            }
        })

        if (isAlreadyFollowing.length !== 0) {
            return NextResponse.json({ error: "Can't follow the same user twice" }, { status: 403 })
        }

        const follow = await prisma.follows.create({
            data: {
                followerId,
                followingId
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

        const { id } = UserUnFollowValidator.parse(body)

        await prisma.follows.delete({
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