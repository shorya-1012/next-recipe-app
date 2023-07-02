import { AiOutlineLoading } from 'react-icons/ai'

const loading = () => {
    return (
        <div className="h-screen w-screen bg-dark-body text-white flex flex-col items-center justify-center">
            <div>
                <AiOutlineLoading className=' animate-spin mb-5' size={70} />
            </div>
            <h1 className='text-xl font-semibold'>Searching...</h1>
        </div>
    )
}

export default loading