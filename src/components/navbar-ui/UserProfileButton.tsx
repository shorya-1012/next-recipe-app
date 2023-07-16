import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import {FaUser} from 'react-icons/fa'
import {TiTick} from 'react-icons/ti'
import {AiFillHeart, AiFillEdit} from 'react-icons/ai'
import {RxDashboard} from 'react-icons/rx'
import {MdOutlineLogout, MdArrowDropDown} from 'react-icons/md'
import {useClerk} from "@clerk/nextjs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/DropdownMenu"
import {Avatar} from "../ui/Avatar"
import {AvatarImage} from "@radix-ui/react-avatar"


type Props = {
    userId: string | null | undefined
}

type UserDetail = {
    userDetails: {
        profileImageUrl: string | null;
        role: "ADMIN" | "USER"
    };
}

const UserProfileButton = ({userId}: Props) => {

    const {signOut} = useClerk()

    const {data: user, isLoading} = useQuery(['getProileImage'], async () => {
        const {data} = await axios.get<UserDetail>('/api/get-current-user-profile-pic')
        return data.userDetails
    })


    return (
        <div className='flex text-center h-full items-center'>
            <DropdownMenu >
                <DropdownMenuTrigger>
                    <div className="flex gap-1 items-center">
                        <Avatar>
                            <AvatarImage src={user?.profileImageUrl || ''} />
                        </Avatar>
                        {
                            isLoading &&
                            <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] relative rounded-[50%] overflow-hidden">
                                <div className="w-full h-full animate-pulse bg-gray-500 overflow-hidden"></div>
                            </div>
                        }
                        <MdArrowDropDown />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 mr-5 bg-dark-body my-5 py-3 rounded-xl ">
                    <DropdownMenuLabel>
                        <span className="h-4 text-lg">My Account</span>
                    </DropdownMenuLabel>
                    <hr className="w-full h-px mt-1" />
                    <DropdownMenuSeparator />
                    {
                        user?.role === 'ADMIN' &&
                        <DropdownMenuItem>
                            <Link href={`/dashboard`}>
                                <div className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1">
                                    <RxDashboard size={15} />
                                    <span className=" text-base font-nunito">Dashboard </span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    }
                    <DropdownMenuItem>
                        <Link href={`/user/${userId}`}>
                            <div className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1">
                                <FaUser size={15} />
                                <span className=" text-base font-nunito">View Profile</span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={`/create-recipe`}>
                            <div className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1">
                                <AiFillEdit size={15} />
                                <span className=" text-base font-nunito">Publish Post</span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/favourite-posts'}>
                            <div className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1 ">
                                <AiFillHeart size={15} />
                                <span className=" text-base font-nunito">Favourites</span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={'/following'}>
                            <div className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1">
                                <TiTick size={15} />
                                <span className=" text-base font-nunito">Following</span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button
                            onClick={() => signOut()}
                            className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1 ms-1"
                        >
                            <MdOutlineLogout size={15} />
                            <span className=" text-base font-nunito">Sign Out</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserProfileButton
