
const CardLoading = () => {
    return (
        <div className="rounded w-[340px] max-h-[360px] m-3 bg-dark-body 
         duration-700 font-nunito animate-pulse">
            <div className="relative h-[200px] bg-dark-highlights rounded w-full">
            </div>
            <div className="flex flex-col mt-2 mb-5 pt-1 pb-1 px-3 cursor-pointer">
                <div className="flex gap-3 h-full items-start my-2">
                    <div className=" bg-dark-highlights w-[40px] h-[40px] rounded-[50%]">
                    </div>
                    <div className="flex flex-col h-full">
                        <h5 className="text-xl rounded-lg font-semibold w-[200px] h-[20px] bg-dark-highlights"></h5>
                        <span className="w-[90px] h-[20px] rounded-lg bg-dark-highlights mt-1 mb-2"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardLoading