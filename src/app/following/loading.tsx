import CardLoading from "@/components/CardLoading"

const loading = () => {
    return (
        <div className="w-screen overflow-x-hidden flex flex-col items-center">
            <div className="flex gap-6 place-self-start px-5 pb-3 mx-2 my-5 overflow-x-scroll border-b-[1px] w-full border-gray-500 scrollbar-hide">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-dark-highlights animate-pulse rounded-[50%]">
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-dark-highlights animate-pulse rounded-[50%]">
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-dark-highlights animate-pulse rounded-[50%]">
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-dark-highlights animate-pulse rounded-[50%]">
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-2">
                <CardLoading />
                <CardLoading />
                <CardLoading />
            </div>
        </div >
    )
}

export default loading