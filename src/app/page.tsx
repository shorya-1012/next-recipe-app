import Hero from "@/components/home-page-ui/Hero"
import Link from "next/link";

const Home = async () => {

  return (
    <div className="bg-dark-body min-h-[90vh]">
      <Hero />
      <p className="text-white">Hello</p>
    </div >
  )
}

export default Home;