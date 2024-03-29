import Hero from "@/components/home-page-ui/Hero"
import Link from "next/link";
import {prisma} from "@/lib/db";
import Posts from "@/components/home-page-ui/Posts";

const Home = async () => {

    const postCategories = await prisma.category.findMany()

    return (
        < div className="bg-dark-body text-white min-h-screen flex flex-col items-center overflow-x-hidden" >
            <Hero />
            < div className="w-[80%] flex gap-3 overflow-x-scroll lg:justify-center scroll-smooth scrollbar-hide" >
                {
                    postCategories.map(postCategory => {
                        return (
                            <Link href={`/search?q=${postCategory.name}`}>
                                <div key={postCategory.id} className=" min-w-max rounded-xl font-nunito font-semibold bg-blue-600 text-white px-3 py-1 mt-8" >
                                    <span>{postCategory.name} </span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <Posts />
        </div >
    )
}

export default Home;
