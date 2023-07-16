import Image from "next/image";

const NotFound = () => {
    return (
        <div className="h-screen w-screen py-5 flex flex-col items-center justify-center font-nunito">
            <div className="w-[400px] h-[400px] relative">
                <Image
                    src={'https://utfs.io/f/6a2a140d-46b0-4679-ac63-06dacd0e7e42_data-search-not-found-illustration-concept-vector-removebg-preview.png'}
                    alt="not-found image"
                    fill={true}
                    sizes="100%"
                />
            </div>
            <h1 className="text-3xl">Nothing to see here</h1>
            <h2 className="text-xl">No search results found</h2>
        </div>
    )
}

export default NotFound;
