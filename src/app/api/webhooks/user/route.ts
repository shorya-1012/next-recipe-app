import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from 'next/headers'
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const secret = process.env.WEBHOOK_SECRET || ""

async function handler(req: Request) {
    const payload = await req.json();
    const headersList = headers();
    const heads = {
        "svix-id": headersList.get("svix-id"),
        "svix-timestamp": headersList.get("svix-timestamp"),
        "svix-signature": headersList.get("svix-signature")
    }

    const wh = new Webhook(secret);
    let evt: Event | null = null;

    try {
        evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event
    } catch (error) {
        console.error((error as Error).message)
        return NextResponse.json({}, { status: 400 })
    }

    const eventType: EventType = evt.type
    if (eventType === "user.created") {
        const { id, first_name, last_name, email_addresses } = evt.data
        console.log(id)
        console.log(first_name + ' ' + last_name)
        console.log(email_addresses)

        await prisma.user.create({
            data: {
                id: id as string,
                first_name: first_name as string,
                last_name: last_name as string
            }
        })
    }

    type EventType = "user.created" | "user.updated" | "*"

    type Event = {
        data: Record<string, string | number>,
        object: "event",
        type: EventType
    }
}


export const GET = handler
export const POST = handler