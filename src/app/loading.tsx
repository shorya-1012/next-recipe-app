import CardLoading from "@/components/CardLoading"

const loading = () => {
    return (
        < div className="bg-dark-body text-white min-h-[90vh] overflow-x-hidden" >
            <section className='relative sm:z-0 h-[50vh] lg:h-[80vh]'>
                <div
                    className='h-full animate-pulse bg-dark-highlights w-[100vw] bg-cover bg-no-repeat bg-center' >
                </div>
            </section>
            <div className="max-w-[1440px] flex flex-col items-center mx-auto">
                <div className="w-full animate-pulse md:w-[80%] ms-10 sm:mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                </div>
            </div>
        </div >
    )
}

export default loading