import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "../data-table"
import Sidebar from "@/components/dashboard/SideBar"
import AddCategoryButton from "@/components/dashboard/AddCategoryButton"

const page = async () => {

    const { userId } = auth()
    if (!userId) redirect('/')

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user || user.role !== 'ADMIN') redirect('/')

    const categories = await prisma.category.findMany({
        select: {
            name: true,
        }
    })

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-[70vw] md:w-[90vw] min-h-screen overflow-x-hidden font-nunito">
                <div className="container flex flex-col items-start p-4">
                    <div className="w-full">
                        <DataTable columns={columns} data={categories} />
                    </div>
                    <AddCategoryButton />
                </div>
            </div>
        </div>
    )
}

export default page