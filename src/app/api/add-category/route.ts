import { NewCategoryValidator } from "@/lib/apiValidators"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import z, { ZodError } from 'zod'
import { fromZodError } from "zod-validation-error"

export async function POST(req: Request) {
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

        const { name } = NewCategoryValidator.parse(body)

        const category = await prisma.category.findUnique({
            where: {
                name
            }
        })

        if (category) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 403 })
        }

        await prisma.category.create({
            data: {
                name
            }
        })

        return NextResponse.json({ message: 'Added successfully' }, { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const err = fromZodError(error as ZodError)
            return NextResponse.json({ error: err }, { status: 422 })

        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}