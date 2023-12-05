import Image from "next/image"
import hero from '../hero.jpg'
import Link from "next/link"

function Hero() {
  return (
    <div className="flex gap-4 p-4 md:p-12 md:flex-row flex-col">
        <div className="flex flex-col items-center justify-center max-md:p-12 lg:p-8 gap-4 md:gap-8 md:w-[50%]">
            <h1 className="text-[2rem] text-center font-semibold md:text-left customsm:font-normal customsm:mt-[2rem] customsm:text-[1.4rem]">Connecting Campus Students</h1>
            <p className="text-center md:text-left md:text-[18px] ">
            CampusConnect is a social networking platform designed exclusively for college students. Our platform offers a unique opportunity for students to connect, collaborate, and explore professional opportunities with other students on campus.
            </p>
            <Link href={`/colleges`}>
            <button className="text-left text-white p-3 rounded-sm hover:opacity-90 bg-fuchsia-600">Explore Colleges</button>
            </Link>
        </div>
        <div className="mx-auto md:w-[40%]">
            <Image
            src={hero}
            width={500}
            height={500}
            alt="Hero"
            />
        </div>
    </div>
  )
}

export default Hero