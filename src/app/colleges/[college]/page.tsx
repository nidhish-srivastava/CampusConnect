"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { AuthId } from "@/types";
import { baseUrl } from "@/utils";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function CollegeName() {
  const {college} = useParams()
  const [collegeStudents,setCollegeStudents] = useState<AuthId[]>([])

  const fetchCollegeStudents = async()=>{
    try {
      const response = await fetch(
        `${baseUrl}/user/college-students/${college}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: AuthId[] = await response.json();
      setCollegeStudents(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchCollegeStudents()
  },[])
    const parseCollegeName = (name: string) => name.split("%20").join(" ");
    return (
      <>
        <h2 className="text-center text-xl">
          List of {parseCollegeName(college as string)} students
        </h2>
        <div className="w-1/2 mx-auto my-8">
          {collegeStudents?.map((e, i) => (
            <Link href={`/${e?.username}`} key={i}>
              <div className="p-4 mb-2 border-2 bg-transparent flex gap-8 items-center">
                <Avatar>
                  <AvatarImage src={e?.dp as string} alt="@shadcn" />
                  <AvatarFallback>{e?.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="cursor-pointer">{e?.username}</h2>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
}

export default CollegeName;
