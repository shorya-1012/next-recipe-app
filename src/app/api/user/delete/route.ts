import { DeleteUserValidator } from "@/lib/apiValidators"
import { prisma } from "@/lib/db"
import { clerkClient } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import z, { ZodError } from 'zod'
import { fromZodError } from "zod-validation-error"

export async function DELETE(req: Request) {

    const body = await req.json()

    try {
        const { userId } = auth()
        if (!userId) return NextResponse.json({ error: 'Not signed In' }, { status: 401 })

        const { id } = DeleteUserValidator.parse(body)

        const currUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (currUser?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
        }

        if (currUser.id === id) return NextResponse.json({ status: 403 })

        await clerkClient.users.deleteUser(id)

        return NextResponse.json({ status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const err = fromZodError(error as ZodError)
            return NextResponse.json({ error: err }, { status: 422 })

        }
        return NextResponse.json({ error: error }, { status: 500 })
    }

}