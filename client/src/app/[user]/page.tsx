"use client"
import { useParams } from "next/navigation";
import ProfileInformation from "@/components/ProfileInformation";
import { useConnectContext } from "@/context/context";
import CreateProfile from "../create-profile/page";

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
                {data?.email.length == 0 ? <CreateProfile/> :
                <ProfileInformation profileObject = {data} />
                }
              </div>
      )
}