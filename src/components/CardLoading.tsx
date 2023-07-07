
const CardLoading = () => {
    return (
        <div className="rounded w-[315px] md:w-[300px] h-[310px] m-4 bg-dark-highlights text-white animate-pulse">
            <div className="relative h-[200px] w-full rounded bg-gray-600">
            </div>
            <div className="flex flex-col my-3 pt-1 pb-2 px-3 cursor-pointer">
                <div className="text-xl h-[20px] w-[140px] rounded-xl bg-gray-600 font-semibold mb-2"></div>
                <div className="rounded-full h-[15px] w-[70px] bg-gray-600 text-xs py-1 px-2 border border-white"></div>
            </div>
        </div>
    )
}

export default CardLoading