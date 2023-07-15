import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"

type Props = {
    postImageURL: string;
    title: string;
    authorUserName?: string;
    authorImageUrl?: string | null;
}

const UserPostCard = (props: Props) => {
    return (
        <div className="rounded w-[360px] sm:w-[330px] md:w-[360px] lg:w-[380px] max-h-[360px] m-3 bg-dark-body 
        hover:-translate-y-4 duration-500 hover:shadow-xl hover:shadow-gray-700 font-nunito">
            <div className="relative h-[200px] sm:h-[220px] lg:h-[240px] w-full">
                <Image src={props.postImageURL} alt="recipe-image" fill={true} className="object-cover rounded" />
            </div>
            <div className="flex flex-col mt-2 mb-5 pt-1 pb-1 px-3 cursor-pointer">
                <div className="flex gap-3 h-full items-start my-2">
                    <Avatar className={`${props.authorUserName ? '' : 'hidden'}`}>
                        <AvatarImage src={props.authorImageUrl || ''} />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col h-full">
                        <h5 className="text-xl font-semibold">{props.title}</h5>
                        <span className={`${props.authorUserName ? '' : 'hover'} text-gray-500 mt-1 mb-2`}>
                            {props.authorUserName}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPostCard