"use client"
import { useParams } from "next/navigation";
import { useConnectContext } from "@/context/context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileBaseInfo from "@/components/ProfileBaseInfo";
import ProfileInformation from "@/components/ProfileInformation";
import { baseUrl } from "@/lib";
import { useEffect, useState } from "react";
import { UserType } from "@/types";
import { defaultDp } from "@/utils";

export default  function FetchUser(){
  const {userProfile} = useParams()
  const {user} = useConnectContext()
  const [updatedDp,setUpdatedDp] = useState(defaultDp)
  const [data,setData] = useState<UserType>()

  const fetchProfileInfo = async()=>{
    try {
      const response = await fetch(`${baseUrl}/user/${userProfile}`)
      const data = await response.json()
      setData(data)
      setUpdatedDp(data.authId.dp)
    } catch (error) {
    }
  }

 

  useEffect(()=>{
    fetchProfileInfo()
  },[])

      
      return(
              <div>
                <ProfileBaseInfo updatedDp = {updatedDp} setUpdatedDp={setUpdatedDp} setProfileObject = {setData} profileObject={data}/>
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