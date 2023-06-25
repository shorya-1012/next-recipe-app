import Hero from "@/components/home-page-ui/Hero"
import Link from "next/link";
import { prisma } from "@/lib/db";
import UserPostCard from "@/components/UserPostCard";
import Posts from "@/components/home-page-ui/Posts";

const Home = async () => {

  const initialPosts = await prisma.post.findMany({
    where: {
      visibility: "PUBLIC"
    },
    include: {
      category: true
    },
    take: 3
  })

  return (
    < div className="bg-dark-body text-white min-h-[90vh] overflow-x-hidden" >
      <Hero />
      <div className="max-w-[1440px] flex flex-col items-center mx-auto">
        <Posts initialPosts={initialPosts} />
      </div>
    </div >
  )
}

export default Home;