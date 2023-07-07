import Image from "next/image";

type Props = {
    imgageURL: string;
    userName: string;
}

const UserProfileCard = (props: Props) => {
    return (
        <div className="rounded-xl w-[200px] flex flex-col items-center text-center m-4 bg-dark-highlights text-white py-5 hover:-translate-y-4 duration-500 hover:shadow-xl hover:shadow-gray-700">
            <div className="relative h-[100px] w-[100px]">
                <Image src={props.imgageURL} sizes="100%" alt="profile-image" fill={true} className="rounded-[50%]" />
            </div>
            <div className="flex flex-col my-3 pt-1 pb-2 px-3 cursor-pointer">
                <h5 className="text-xl font-semibold mb-2">{props.userName}</h5>
            </div>
        </div>
    )
}

export default UserProfileCard