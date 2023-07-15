import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "../data-table"
import Sidebar from "@/components/dashboard/SideBar"

const page = async () => {

    const { userId } = auth()
    if (!userId) redirect('/')

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user || user.role !== 'ADMIN') redirect('/')

    const users = await prisma.user.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            role: true
        }
    })

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-[70vw] ms-3 md:w-[90vw] min-h-screen overflow-x-hidden font-nunito">
                <div className="w-full py-4">
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
        </div>
    )
}

export default page