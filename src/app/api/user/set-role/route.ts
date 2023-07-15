import { auth } from "@clerk/nextjs"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import z, { ZodError } from 'zod'
import { fromZodError } from "zod-validation-error"
import { UpdateUserRoleValidator } from "@/lib/apiValidators"

export async function PUT(req: Request) {
    const body = await req.json()

    try {
        const { userId } = auth()
        if (!userId) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Not Authorized' }, { status: 401 })
        }

        const { id } = UpdateUserRoleValidator.parse(body)

        if (id === userId) return NextResponse.json({ error: 'Cannot update own role' }, { status: 403 })

        const userToBeUpdated = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!userToBeUpdated) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        const currentRole = userToBeUpdated.role

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                role: currentRole === 'ADMIN' ? 'USER' : 'ADMIN'
            }
        })

        return NextResponse.json({ message: 'success' }, { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const err = fromZodError(error as ZodError)
            return NextResponse.json({ error: err }, { status: 422 })

        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}