import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {

        const categories = await prisma.category.findMany()
        return NextResponse.json({ categories }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ status: 500 })
    }
}