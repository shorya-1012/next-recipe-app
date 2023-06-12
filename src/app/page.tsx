import Hero from "@/components/home-page-ui/Hero"
import Link from "next/link";

const Home = async () => {

  return (
    <div className="bg-dark-body text-white min-h-[90vh]">
      <Hero />
    </div >
  )
}

export default Home;