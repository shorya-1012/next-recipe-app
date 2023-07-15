'use client'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'

type Props = {
    style: string;
    autoFocus: boolean
    setShowRecentSearches: any
    handleSearch: (e: React.FormEvent, searchParams: string) => void
}

const SearchBar = ({ style, setShowRecentSearches, autoFocus, handleSearch }: Props) => {

    const [searchParams, setSearchParams] = useState<string>('')

    return (
        <form onSubmit={(e) => handleSearch(e, searchParams)} className={`${style} rounded-2xl overflow-hidden shadow-xl`}>
            <input
                className='w-full h-full px-3 text-md bg-[#30363d] text-white'
                placeholder='Search a recipe'
                value={searchParams}
                onChange={(e) => setSearchParams(e.target.value)}
                autoFocus={autoFocus}
                onFocus={() => setShowRecentSearches(true)}
            />
            <button className='bg-dark-highlights flex justify-center items-center p-2 h-full'>
                <BiSearch size={20} />
            </button>
        </form>
    )
}

export default SearchBar