'use client'
import { GiCook } from 'react-icons/gi'
import { RxCross1 } from 'react-icons/rx'
import { useState, useEffect, useRef } from "react"
import Link from 'next/link'
import { SignedOut, SignedIn, useAuth } from "@clerk/nextjs"
import SearchBar from './SearchBar'
import UserProfileButton from './UserProfileButton'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import RecentSearches from './RecentSearches'


const Navbar = () => {

    const data = localStorage.getItem('recentSearch')
    let initialRecentSearchData = []
    if (data) {
        initialRecentSearchData = JSON.parse(data)
    }

    const { userId } = useAuth()
    const [searchDropdown, setSearchDropdown] = useState(false)

    const [showRecentSearches, setShowRecentSearches] = useState(false)
    const [recentSearches, setRecentSearches] = useState<string[]>(initialRecentSearchData)
    const router = useRouter()
    const refOne = useRef<HTMLInputElement>(null)

    const clearSearch = () => {
        localStorage.removeItem('recentSearch')
        setRecentSearches([])
        setShowRecentSearches(false)
        router.refresh()
    }

    useEffect(() => {
        const getRecentSearches = () => {
            if (data) setRecentSearches(JSON.parse(data))
        }
        document.addEventListener("click", handleClickOutside, true)
        getRecentSearches()
    }, [])

    useEffect(() => {
        localStorage.setItem('recentSearch', JSON.stringify(recentSearches))
    }, [recentSearches])

    const handleClickOutside = (e: any) => {
        if (!refOne.current!.contains(e.target)) {
            setShowRecentSearches(false)
        }
    }

    console.log(showRecentSearches)

    const handleSearch = async (e: React.FormEvent, searchParams: string) => {
        e.preventDefault()
        if (!searchParams) {
            return
        }

        setRecentSearches(prev => [...prev, searchParams])

        setShowRecentSearches(false)
        setSearchDropdown(false)
        const encodedSearchParams = encodeURI(searchParams)
        router.push(`/search?q=${encodedSearchParams}`)
    }

    return (
        <div className='flex flex-col bg-dark-body text-white overflow-x-hidden'>
            <header className="w-screen flex justify-between items-center h-[68px] overflow-x-hidden">
                <Link href={'/'}>
                    <div className='flex h-full items-center ms-2 '>
                        <div className='mx-2'>
                            <GiCook size={35} />
                        </div>
                        <p className='text-xl font-righteous '>RecipeRealm</p>
                    </div>
                </Link>
                <div ref={refOne} className='flex flex-col w-full justify-center items-center h-full'>
                    <SearchBar
                        style='hidden sm:flex w-[35vw] h-[40px]'
                        autoFocus={false}
                        setShowRecentSearches={setShowRecentSearches}
                        handleSearch={handleSearch}
                    />
                    <RecentSearches
                        recentSearches={recentSearches}
                        style={`${showRecentSearches ? 'top-[8%]' : 'top-[-100%]'} py-2 my-2`}
                        clearSearch={clearSearch}
                    />
                </div>
                <div className='flex h-full items-center'>
                    <div className='mr-2 md:mr-7 h-full'>
                        <SignedIn>
                            <UserProfileButton userId={userId} />
                        </SignedIn>
                        <SignedOut>
                            <Link href={'/sign-in'}>
                                <p>Sign In</p>
                            </Link>
                        </SignedOut>
                    </div>
                    <button className='block sm:hidden mr-3'
                        onClick={() => setSearchDropdown((prev: boolean) => !prev)}
                    >
                        <BiSearch size={25} />
                    </button>
                </div>
            </header>
            <div
                className={`sm:hidden w-screen h-screen absolute ${searchDropdown ? 'right-[0%]' : 'right-[100%]'} py-3 shadow-2xl overflow-x-hidden bg-dark-body z-10 ease-in-out duration-500`}>
                <div className='flex h-[40px] gap-x-5 items-center justify-end overflow-x-hidden shadow-xl px-4'>
                    <SearchBar
                        style='flex w-[80%] items-center h-[85%]'
                        setShowRecentSearches={setShowRecentSearches}
                        autoFocus={true}
                        handleSearch={handleSearch}
                    />
                    <button
                        onClick={() => setSearchDropdown(false)}>
                        <RxCross1 size={20} />
                    </button>
                </div>
                <div className='px-3 my-10'>
                    <div className='w-full border-b-[1px] border-gray-500 flex justify-between items-center mb-5'>
                        <h2 className='text-lg'>Recent Searches</h2>
                        <button onClick={() => clearSearch()} className='text-blue-800'>
                            clear
                        </button>
                    </div>
                    {
                        recentSearches.reverse().map((recentSearch, i) => {
                            if (i === 5) {
                                return (
                                    <hr className="w-full bg-gray-500 h-px" />
                                )
                            }
                            return (
                                <Link href={`/search?q=${recentSearch}`}>
                                    <p key={i} className="w-full py-2 border-b-[1px] border-gray-500">
                                        {recentSearch}
                                    </p>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
