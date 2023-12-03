"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { AuthId } from "@/types";
import { baseUrl } from "@/lib";

const Page = () => {
    const {college} = useParams()
    const [collegeStudents,setCollegeStudents] = useState<AuthId[]>([])
    const fetchCollegeStudents = async() =>{
        const response = await fetch(`${baseUrl}/college/fetchCollegeStudents/${college}`)
        const data = await response.json()
        // console.log(data);
        setCollegeStudents(data)
    }
    useEffect(()=>{
        fetchCollegeStudents()
    },[])
  return (
    <div className="w-1/2 mx-auto my-8">
      {collegeStudents.map((e,i)=>(
          <Link href={`/${e.username}`}
            key={i}
          >
          <div
            className="p-4 mb-2 border-2 bg-transparent flex gap-8 items-center"
          >
            <Avatar>
              <AvatarImage src={e.dp as string} alt="@shadcn" />
              <AvatarFallback>{e.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2
              className="cursor-pointer"
            >
              {e.username}
            </h2>
          </div>
            </Link>
      ))}
    </div>
  )
}

export default Page