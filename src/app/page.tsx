import Hero from "@/components/home-page-ui/Hero"
import Link from "next/link";
import { prisma } from "@/lib/db";
import UserPostCard from "@/components/UserPostCard";

const Home = async () => {

  const userPosts = await prisma.post.findMany({
    where: {
      visibility: "PUBLIC"
    },
    include: {
      category: true
    }
  })

  return (
    < div className="bg-dark-body text-white min-h-[90vh] overflow-x-hidden" >
      <Hero />
      <div className="max-w-[1440px] flex flex-col items-center my-10">
        <div className=" w-full md:w-[80%] ms-10 sm:mx-auto py-5 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {
            userPosts.map(userPost => {
              return (
                <UserPostCard key={userPost.postId} title={userPost.postTitle} imageURL={userPost.imageURL} categoryName={userPost.category[0].name} />
              )
            })
          }
        </div>
      </div>
    </div >
  )
}

export default Home;