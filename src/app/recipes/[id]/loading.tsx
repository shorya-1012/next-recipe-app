const loading = () => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-dark-body text-white flex flex-col items-start font-nunito">
            <div className="flex flex-col md:flex-row mt-10">
                <div id="image-holder" className="relative w-[350px] h-[200px] md:w-[420px] md:h-[300px] lg:w-[500px] lg:h-[350px] overflow-hidden mx-5 md:mx-10 bg-dark-highlights rounded-lg animate-pulse">
                </div>
                <div className="flex flex-col justify-start mx-5 mt-5">
                    <div className="text-xl font-semibold lg:text-5xl md:my-5 rounded bg-dark-highlights w-[190px] h-[30px] animate-pulse"></div>
                    <div className="flex items-center mt-5 md:mb-5">
                        <div className="w-[45px] relative h-[45px] rounded-[50%] overflow-hidden mr-3 bg-dark-highlights animate-pulse">
                        </div>
                        <div className="text-xl rounded bg-dark-highlights animate-pulse w-[110px] h-[30px]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default loading