import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"

type Props = {
    userProfilePicUrl: string;
    userName: string;
    followerCount: number
}

const SearchUserCard = ({ userProfilePicUrl, userName, followerCount }: Props) => {
    return (
        <div className="flex gap-6 justify-start font-nunito py-3 my-1 overflow-hidden">
            <Avatar className="w-[120px] h-[120px]">
                <AvatarImage src={userProfilePicUrl} />
                <AvatarFallback>
                    {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-4 flex-wrap overflow-x-hidden">
                <h5 className="text-lg md:text-3xl">{userName}</h5>
                <span className=" text-base text-gray-500">{followerCount} Followers</span>
            </div>
        </div>
    )
}

export default SearchUserCard