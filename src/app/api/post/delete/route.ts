import { DeletePostValidator } from "@/lib/apiValidators"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import z, { ZodError } from 'zod'
import { fromZodError } from "zod-validation-error"

export async function DELETE(req: Request) {

    const body = await req.json()

    try {
        const { userId } = auth()
        if (!userId) return NextResponse.json({ error: 'Not signed In' }, { status: 401 })

        const { postId} = DeletePostValidator.parse(body)

        const post = await prisma.post.findUnique({
            where: {
                postId
            }
        })

        const currUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!currUser || currUser.role !== 'ADMIN' || userId !== post?.userId){
            return NextResponse.json({ error: 'Not signed In' }, { status: 401 })
        }

        await prisma.post.delete({
            where: {
                postId
            }
        })

        return NextResponse.json({message : 'delted successfully'} ,{ status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const err = fromZodError(error as ZodError)
            return NextResponse.json({ error: err }, { status: 422 })

        }
        return NextResponse.json({ error: error }, { status: 500 })
    }

}
