import Link from "next/link"

type Props = {
    recentSearches: string[]
    style: string;
    clearSearch: any;
}

const RecentSearches = ({recentSearches, clearSearch, style}: Props) => {
    return (
        <div className={`${style} ${recentSearches.length === 0 ? 'hidden' : ''} z-10 px-2 w-[40vw] bg-dark-highlights rounded-xl ease-in-out duration-500 `}>
            <div className="flex justify-between items-center w-full border-b-[1px] border-gray-500">
                <span className="font-nunito">Recent Searches</span>
                <button
                    onClick={() => clearSearch()}
                    className="text-blue-800">
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
                        <Link key={i} href={`/search?q=${recentSearch}`}>
                            <p className="w-full py-2 border-b-[1px] border-gray-500">
                                {recentSearch}
                            </p>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default RecentSearches
