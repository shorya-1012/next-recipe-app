"use client"
import { useClerk } from "@clerk/nextjs"

const SignOutButton = () => {
    const { signOut } = useClerk();

    return (
        <button onClick={() => signOut()} className="w-[120px] h-[40px] mx-2 rounded-lg bg-red-600 ">
            Sign Out
        </button>
    )
}

export default SignOutButton