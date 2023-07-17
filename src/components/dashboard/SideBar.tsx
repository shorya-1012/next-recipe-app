import Link from "next/link"
import {RxDashboard, RxPerson} from 'react-icons/rx';
import {HiOutlineHome} from 'react-icons/hi';
import {BiCategory} from 'react-icons/bi'
import {FileStack} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip";

type Props = {
    currentUrl: string;
}

const Sidebar = ({currentUrl}: Props) => {

    return (
        <div className=' w-20 min-h-screen p-4 text-white border-r-[1px] flex flex-col justify-between'>
            <div className='flex flex-col items-center'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href='/'>
                                <div className='bg-blue-600 text-black p-3 rounded-xl inline-block'>
                                    <HiOutlineHome size={20} />
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                            <p>Home Page</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <span className='border-b-[1px] border-gray-500 w-full p-2'></span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href='/dashboard'>
                                <div className='bg-dark-highlights hover:bg-gray-700 text-white cursor-pointer my-4 p-3 rounded-xl inline-block'>
                                    <RxDashboard size={20} />
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                            <p>Main Dashboard Page</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href='/dashboard/posts'>
                                <div className='bg-dark-highlights hover:bg-gray-700 text-white cursor-pointer my-4 p-3 rounded-xl inline-block'>
                                    <FileStack size={"24px"} />
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                            <p>View Posts</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href='/dashboard/users'>
                                <div className='bg-dark-highlights hover:bg-gray-700 text-white cursor-pointer my-4 p-3 rounded-xl inline-block'>
                                    <RxPerson size={20} />
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                            <p>View Users</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href='/dashboard/categories'>
                                <div className='bg-dark-highlights hover:bg-gray-700 text-white cursor-pointer my-4 p-3 rounded-xl inline-block'>
                                    <BiCategory size={20} />
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-200 text-xs text-gray-900">
                            <p>View Categories</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default Sidebar;
