"use client"
import { useParams } from "next/navigation";
import { useConnectContext } from "@/context/context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileBaseInfo from "@/components/ProfileBaseInfo";
import ProfileInformation from "@/components/ProfileInformation";

async function fetchUser(){
    const {user} = useParams()
    const response = await fetch(`http://localhost:4000/user/${user}`)
    return response.json()
}

export default async function FetchUser(){
    const {user} = useConnectContext()
      const data  = await fetchUser()
      
      return(
              <div>
                <ProfileBaseInfo profileObject={data}/>
                {/* Ensuring that the user who logged,his name matches the profile info username,then only he can create one profile if the profile aint created */}
                {( data?.email.length == 0 && data?.username == user ) ?
                  <div className="text-center mt-6">
                  <Link href={`/create-profile`}>
                    <Button className="text-sm bg-amber-600 px-3">
                      Create your Profile
                    </Button>
                  </Link>
                </div> : 
              <ProfileInformation profileObject = {data} /> 
              }
              </div>
      )
}