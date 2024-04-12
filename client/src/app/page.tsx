import Image from "next/image"
import Link from "next/link"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import Feat1 from "@/assets/features/2.png"
import Feat3 from "@/assets/features/3.png"
import Feat4 from "@/assets/features/4.png"
import Feat5 from "@/assets/features/5.png"
import { Suspense, lazy } from "react"
const  Heroanimation = lazy(()=>import("@/components/ui/Heroanimation"))
function Home() {
  return (
    <>
    <Hero/>
    <FeaturesSection/>
    <Footer/>
    </>
  )
}

export default Home

function Hero() {
  return (
    <div className=" bg-slate-50 py-8 md:py-0 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-[60%] text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Empowering students to thrive together</h1>
          <p className="text-lg md:text-xl mb-6">Where students unite for growth and success</p>
          <Link href={`/colleges`}>
            <button className="text-lg md:text-xl bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out font-semibold">Explore Colleges</button>
          </Link>
        </div>
        <Suspense fallback="">
        <div className="md:w-[40%] mx-auto">
          <Heroanimation/>
        </div>
        </Suspense>
      </div>
    </div>
  );
}


function FeaturesSection() {
  return (
    <section className= " bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Features</h2>
        <div className="flex flex-col gap-8">
          <FeatureCard
            title="Campus Connections"
            description="Connect with fellow students from your college and other campuses around the world."
            // icon={<i className="fas fa-users text-3xl text-gray-700"></i>}
            image={Feat1}
            reverse={false}
          />
          <FeatureCard
            title="Custom Profiles"
            description="Create personalized profiles to showcase your interests, skills, and experiences."
            // icon={<i className="fas fa-user-circle text-3xl text-gray-700"></i>}
            image={Feat5}
            reverse={true}
          />
          <FeatureCard
            title="Search People"
            description="Search students by entering their username using our Searchbar"
            // icon={<i className="fas fa-hands-helping text-3xl text-gray-700"></i>}
            image={Feat3}
            reverse={false}
          />
          <FeatureCard
            title="Explore Colleges"
            description="Find students from a Specific college from our assoicated college lists"
            // icon={<i className="fas fa-briefcase text-3xl text-gray-700"></i>}
            image={Feat4}
            reverse={true}
          />
        </div>
      </div>
    </section>
  );
}


function FeatureCard({ title, description, image, reverse }:any) {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} gap-8`}>
      <div className="md:w-[63%]">
        <Image src={image} alt={title} className="rounded-lg" />
      </div>
      <div className="md:w-[37%] flex flex-col justify-center px-4 md:px-0">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">{title}</h3>
        <p className="text-lg md:text-xl text-gray-700">{description}</p>
      </div>
    </div>
  );
}

function Footer(){
  return(
    <footer className="bg-gray-900 text-white py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p>&copy; 2024 CampusConnect | Developed by Nidhish </p>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/nidhish-srivastava/" target="_blank" rel="noopener noreferrer" className=" mx-2">
            <LinkedinIcon/>
          </a>
          <a href="https://twitter.com/Nidhish_30" target="_blank" rel="noopener noreferrer" className="mx-2">
            <span>
              <TwitterIcon/>
            </span>
          </a>
          <a href="https://github.com/nidhish-srivastava" target="_blank" rel="noopener noreferrer">
            <span>
              <GithubIcon/>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
