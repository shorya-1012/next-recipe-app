import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/Avatar";

type Props = {
    postImageURL: string;
    title: string;
    authorUserName: string;
    authorImageUrl: string;
}

const SearhPostCard = ({postImageURL, title, authorUserName, authorImageUrl}: Props) => {
    return (
        <div className="flex gap-4 justify-start font-nunito py-3 my-1 overflow-hidden">
            <div className="relative w-[180px] h-[120px] shrink-0 sm:w-[340px] sm:h-[200px] overflow-hidden rounded-xl">
                <Image src={postImageURL} alt="postImage" fill={true} sizes="100%" className="rounded-xl object-cover" />
            </div>
            <div className="flex flex-col items-start gap-4 flex-wrap overflow-x-hidden">
                <h5 className="text-lg md:text-3xl">{title}</h5>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={authorImageUrl} />
                        <AvatarFallback>
                            {authorUserName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-500">{authorUserName}</span>
                </div>
            </div>
        </div>
    )
}

export default SearhPostCard
