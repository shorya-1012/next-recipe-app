import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const queryParams = searchParams.get('count') || '1'
    const pageParam = parseInt(queryParams)
    const requiredPostsNumber = 3

    try {
        const posts = await prisma.post.findMany({
            where: {
                visibility: "PUBLIC"
            },
            skip: (pageParam - 1) * requiredPostsNumber,
            take: requiredPostsNumber,
            include: {
                user: true
            }
        })

        return NextResponse.json({ posts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 500 })
    }
} 