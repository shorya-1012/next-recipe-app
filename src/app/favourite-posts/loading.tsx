import CardLoading from "@/components/CardLoading"

const loading = () => {
    return (
        <div className="w-screen overflow-x-hidden flex flex-col items-center">
            <span className="text-2xl font-nunito my-5 w-[130px] h-[30px] rounded-full bg-dark-highlights animate-pulse"></span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-2 ">
                <CardLoading />
                <CardLoading />
                <CardLoading />
                <CardLoading />
                <CardLoading />
                <CardLoading />
            </div>
        </div >
    )
}

export default loading