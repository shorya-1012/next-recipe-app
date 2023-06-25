
const loading = () => {
    return (
        <div className="min-h-screen w-screen bg-dark-body text-white flex flex-col items-center">
            <div className="w-[800px] h-[300px] flex flex-col md:flex-row justify-center items-center">
                <div className="relative w-[160px] h-[150px] md:mr-10 my-3 bg-dark-highlights rounded-[50%] animate-pulse">
                </div>
                <div className="text-center">
                    <div className="text-3xl mb-2 w-[120px] h-[30px] rounded-xl bg-dark-highlights animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export default loading