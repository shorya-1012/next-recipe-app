import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { userId } = auth()
    try {
        if (!userId) {
            return NextResponse.json({ error: 'not found' }, { status: 404 })
        }
        const userDetails = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                profileImageUrl: true,
                role: true
            }
        })
        return NextResponse.json({ userDetails }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'some error occured' }, { status: 500 })
    }
}