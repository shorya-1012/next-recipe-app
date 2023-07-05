'use client'
import { FcSearch } from 'react-icons/fc'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    style: string,
    setDropdown?: any
}

const SearchBar = ({ style, setDropdown }: Props) => {

    const router = useRouter()
    const [searchParams, setSearchParams] = useState<string>('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchParams) {
            return
        }
        setDropdown && setDropdown(false)
        const encodedSearchParams = encodeURI(searchParams)
        router.push(`/search?q=${encodedSearchParams}`)
    }


    return (
        <form onSubmit={handleSearch} className={`${style} items-center rounded-2xl overflow-hidden shadow-xl `}>
            <input
                className='w-full h-full px-3 text-md bg-[#30363d] text-white'
                placeholder='Search a recipe'
                value={searchParams}
                onChange={(e) => setSearchParams(e.target.value)}
            />
            <button className='bg-dark-highlights flex items-start p-2 h-full'>
                <FcSearch size={25} />
            </button>
        </form>
    )
}

export default SearchBar