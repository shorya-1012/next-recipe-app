import { prisma } from "@/lib/db"
import Sidebar from "@/components/dashboard/SideBar"
import { HiUserCircle } from 'react-icons/hi'
import { FaPenSquare } from 'react-icons/fa'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar"
import Link from "next/link"

const page = async () => {

    const userCount = await prisma.user.count()

    const postsCount = await prisma.post.count({
        where: {
            visibility: 'PUBLIC'
        }
    })

    const admins = await prisma.user.findMany({
        where: {
            role: 'ADMIN'
        }
    })

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-[90vw] max-h-screen font-nunito overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-3 w-full p-4">
                    <div className="w-[265px] md:w-[320px] bg-dark-highlights h-[190px] flex flex-col items-center justify-center rounded-xl">
                        <div className="flex gap-3">
                            <HiUserCircle size={40} />
                            <span className="text-3xl md:text-4xl">Total Users : </span>
                        </div>
                        <span className="text-2xl md:text-3xl mt-3">{userCount}</span>
                    </div>
                    <div className="w-[265px] md:w-[320px] bg-dark-highlights h-[190px] flex flex-col items-center justify-center rounded-xl">
                        <div className="flex gap-3">
                            <FaPenSquare size={40} />
                            <span className="text-3xl md:text-4xl">Total Posts : </span>
                        </div>
                        <span className="text-2xl md:text-3xl mt-3">{postsCount}</span>
                    </div>
                </div>
                <h2 className="text-2xl my-5 mx-3 p-4">Admins :</h2>
                <div className="flex gap-6 place-self-start px-5 pb-3 mx-2 my-5 overflow-x-scroll w-full scrollbar-hide">
                    {
                        admins.map(admin => {
                            return (
                                <Link key={admin.id} href={`/user/${admin.id}`}>
                                    <div className="flex flex-col items-center gap-2">
                                        <Avatar className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
                                            <AvatarImage src={admin.profileImageUrl || ''} />
                                            <AvatarFallback>{admin.first_name.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span>{admin.first_name + ' ' + admin.last_name}</span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default page