'use client'
import { GiCook } from 'react-icons/gi'
import { MdOutlineRestaurantMenu } from 'react-icons/md'
import { MdMenu } from 'react-icons/md'
import { useState } from "react"
import Link from 'next/link'
import { SignedOut, SignedIn, useAuth } from "@clerk/nextjs"
import SearchBar from './SearchBar'
import UserProfileButton from './UserProfileButton'


const Navbar = () => {

    const { userId } = useAuth()
    const [searchDropdown, setSearchDropdown] = useState(false)

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
                <SearchBar style='hidden sm:flex w-[40%] h-[60%]' />
                <div className='flex'>
                    <div className='mr-5 md:mr-7 h-full'>
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
                        {searchDropdown ? <MdOutlineRestaurantMenu size={28} /> : <MdMenu size={28} />}
                    </button>
                </div>
            </header>
            <div
                className={`sm:hidden w-screen h-[180px] absolute ${searchDropdown ? 'top-[8%]' : 'top-[-100%]'} shadow-2xl overflow-hidden bg-dark-body z-10`}>
                <div className='absolute w-full h-full top-[30%] left-[10%]'>
                    <div className='flex w-[80%] h-[40px] items-center rounded-2xl overflow-hidden shadow-xl'>
                        <SearchBar setDropdown={setSearchDropdown} style='flex w-full h-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
