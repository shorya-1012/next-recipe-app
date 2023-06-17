import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"

export async function POST(req: Request) {
    const body = await req.json()
    try {
        const { userId } = auth()
        if (!userId) {
            return NextResponse.json({ status: 401 })
        }

        console.log(body)

        await prisma.$transaction([
            prisma.post.create({
                data: {
                    postTitle: body.title,
                    imageURL: body.imageURL,
                    content: body.content,
                    ingredients: body.ingredients,
                    visibility: body.visibility,
                    category: {
                        connect: {
                            name: body.selectedCategory
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
        return NextResponse.json({ status: 500 })
    }
}
