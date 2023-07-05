import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { userId } = auth()
    try {
        if (!userId) {
            return NextResponse.json({ error: 'not found' }, { status: 404 })
        }
        const { imageUrl } = await clerkClient.users.getUser(userId)
        return NextResponse.json({ imageUrl }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'some error occured' }, { status: 500 })
    }
}