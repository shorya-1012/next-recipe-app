import {prisma} from "@/lib/db"
import {auth} from "@clerk/nextjs"
import {redirect} from "next/navigation"
import {columns} from "./columns"
import {DataTable} from "../data-table"
import Sidebar from "@/components/dashboard/SideBar"

const page = async () => {

    const {userId} = auth()
    if (!userId) redirect('/')

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user || user.role !== 'ADMIN') redirect('/')

    const posts = await prisma.post.findMany({
        where: {
            visibility: 'PUBLIC'
        },
        include: {
            user: true
        }
    })

    const data = posts.map(post => {
        return {
            postId: post.postId,
            author: post.user.first_name + ' ' + post.user.last_name,
            title: post.postTitle
        }
    })

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-[70vw] ms-3 md:w-[90vw] min-h-screen overflow-x-hidden font-nunito">
                <div className="w-full py-4">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}

export default page
