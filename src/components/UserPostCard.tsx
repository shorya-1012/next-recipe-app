import Image from "next/image"

type Props = {
    imageURL: string;
    title: string;
    categoryName: string;
}

const UserPostCard = (props: Props) => {
    return (
        <div className="rounded-xl w-[260px] m-4 bg-dark-highlights text-white">
            <div className="relative h-[180px] w-full">
                <Image src={props.imageURL} alt="recipe-image" fill={true} className="object-cover rounded-xl" />
            </div>
            <div className="flex flex-col my-3 pt-1 pb-2 px-3 cursor-pointer">
                <h5 className="text-xl font-semibold mb-2">{props.title}</h5>
                <p className="rounded-full w-max text-xs py-1 px-2 border border-white">{props.categoryName}</p>
            </div>
        </div>
    )
}

export default UserPostCard