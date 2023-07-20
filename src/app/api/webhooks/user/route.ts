import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
    console.log('endpoint hit')
    const user = await req.json()

    try {

        const {id , first_name , last_name , image_url} = user.data
        console.log(id)
        console.log(last_name)
        console.log(first_name)
        console.log(image_url)

        if(user.type === 'user.created'){
            const newUser = await prisma.user.create({
                data : {
                    id : id,
                    first_name : first_name,
                    last_name : last_name,
                    profileImageUrl : image_url
                }
            })

            console.log('New User :')
            console.log(newUser)
        }
        else if(user.type = 'user.deleted'){
            console.log('deleting user')
            await prisma.user.delete({
                where : {
                    id : id
                }
            })

            console.log('user deleted')
        }

        return NextResponse.json({ok : true} , {status : 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error : error} , {status : 500})
    }
}

