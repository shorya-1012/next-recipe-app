import Image from "next/image"

type Props = {
    imageURL: string;
    title: string;
    categoryName: string;
}

const UserPostCard = (props: Props) => {
    return (
        <div className="rounded w-[260px] h-[310px] m-4 bg-dark-highlights text-white
        hover:-translate-y-4 duration-500 hover:shadow-xl hover:shadow-gray-700">
            <div className="relative h-[180px] w-full">
                <Image src={props.imageURL} alt="recipe-image" fill={true} className="object-cover rounded" />
            </div>
            <div className="flex flex-col mt-2 mb-5 pt-1 pb-1 px-3 cursor-pointer">
                <h5 className="text-lg font-semibold mb-2">{props.title}</h5>
                <p className=" place-self-start rounded-full w-max text-xs py-1 px-2 mb-5 border border-white">{props.categoryName}</p>
            </div>
        </div>
    )
}

export default UserPostCard