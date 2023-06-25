'use client'
import { GiCook } from 'react-icons/gi'
import { FcSearch } from 'react-icons/fc'
import { MdOutlineRestaurantMenu } from 'react-icons/md'
import { MdMenu } from 'react-icons/md'
import { useState } from "react"
import Link from 'next/link'
import { SignedOut, SignedIn, useAuth } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'


const Navbar = () => {

    const { userId } = useAuth()
    const [searchParams, setSearchParams] = useState<string>('')
    const [searchDropdown, setSearchDropdown] = useState(false)
    const router = useRouter()

    const handleSearch = (e: any) => {
        e.preventDefault()
        setSearchDropdown(false)
        const encodedSearchParams = encodeURI(searchParams)
        router.push(`/recipes?q=${encodedSearchParams}`)
    }

    return (
        <div className='flex flex-col bg-dark-body text-white overflow-x-hidden'>
            <header className="w-screen flex justify-between items-center h-[68px]">
                <Link href={'/'}>
                    <div className='flex h-full items-center ms-2 '>
                        <div className='mx-2'>
                            <GiCook size={35} />
                        </div>
                        <p className='text-xl font-righteous '>RecipeRealm</p>
                    </div>
                </Link>
                <form onSubmit={handleSearch} className='hidden sm:flex w-[40%] h-[60%] items-center rounded-2xl overflow-hidden shadow-xl '>
                    <input
                        className='w-full h-full px-3 text-md bg-[#30363d] text-white'
                        placeholder='Seach a recipe'
                        value={searchParams}
                        onChange={(e) => setSearchParams(e.target.value)}
                    />
                    <button className='bg-dark-highlights flex items-start p-2 h-full'>
                        <FcSearch size={25} />
                    </button>
                </form>
                <div className='flex'>
                    <div className='mr-5 md:mr-7 h-full'>
                        <SignedIn>
                            <div className='flex text-center h-full items-center'>
                                <Link href={`user/${userId}`}>
                                    <span>View Profile</span>
                                </Link>
                            </div>
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
                        {searchDropdown ? <MdOutlineRestaurantMenu size={28} /> : <MdMenu size={28} />}
                    </button>
                </div>
            </header>
            <div
                className={`sm:hidden w-screen h-[180px] absolute ${searchDropdown ? 'top-[8%]' : 'top-[-100%]'} shadow-2xl overflow-hidden bg-dark-body z-10`}>
                <div className='absolute w-full h-full top-[30%] left-[10%]'>
                    <div className='flex w-[80%] h-[40px] items-center rounded-2xl overflow-hidden shadow-xl'>
                        <input
                            className='w-full h-full px-3 text-md bg-dark-highlights text-white'
                            placeholder='Seach a recipe or user'
                            value={searchParams}
                            onChange={(e) => setSearchParams(e.target.value)}
                        />
                        <button onClick={handleSearch} className='bg-dark-highlights flex items-center p-2 h-full'>
                            <FcSearch size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
