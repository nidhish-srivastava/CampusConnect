"use client"
import React, { useEffect, useState } from "react";
import { UserType } from "@/types";
import { useParams } from "next/navigation";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import Image from "next/image";
import Link from "next/link";
import { baseUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useConnectContext } from "@/context/context";

const Page = () => {
  const { userProfile } = useParams();
  const {userDocumentId} = useConnectContext()
  const [following,setFollowing] = useState<UserType[]>([])
  const [loading,setLoading] = useState(false)
  const [clickedUserId,setClickedUserId] = useState("")
  const [isUnfollowed,setIsUnfollowed] = useState(false)
  useEffect(()=>{
    const fetchFollowing = async ()=> {
      setLoading(true)
      try {
        const response = await fetch(`${baseUrl}/user/following/${userProfile}`);
        const following = await  response.json();
        setFollowing(following)
      } catch (error) {
        
      }
      finally{
        setLoading(false)
      }
    };
    fetchFollowing()
  },[userProfile])

  const unfollowUserHandler = async(unfollowUserId : string)=>{
    setClickedUserId(unfollowUserId)
    try {
      const response = await fetch(`${baseUrl}/user/unfollow`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: userDocumentId,
          unfollowUserId: unfollowUserId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.ok) setIsUnfollowed(true)
    } catch (error) {
      
    }
  }
  const followUserHandler = async(followUserId : string)=>{
    setClickedUserId(followUserId)
    try {
      const response = await fetch(`${baseUrl}/user/follow`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: userDocumentId,
          followUserId: followUserId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.ok) setIsUnfollowed(false)
    } catch (error) {
      
    }
  }
  
  return (
    <>
    <h2 className="text-center text-2xl mb-8">List of Followers</h2>
    {
      !loading ? 
      <div
        className={`flex flex-col mx-auto items-center mt-20 gap-12 ${fontMontserrat.className} `}
      >
        {following && following?.map((e:any,i)=>{
          return(
            <div className="w-1/2 flex items-center justify-between" key={i}>
            <Link href={`/${e?.auth?.username}`} key={i}>
              <div className="gap-8 flex items-center">
              <Image
              src = {e?.auth?.dp}
              width={60}
              height={60}
              alt='dp'
              />
               <h3 className="text-xl">{e?.auth?.username}</h3>
                </div>
                </Link>
                {
                  clickedUserId == e?.id && isUnfollowed ? (
                    <Button className="follow-unfollow-btn" onClick={()=>followUserHandler(e?.id)}>Follow</Button>
                  ) : 
                <Button
                    className="follow-unfollow-btn"
                    onClick={()=>unfollowUserHandler(e?.id)}
                    >
                    Unfollow
                  </Button>
                }
                    </div>
          )
        })}
      </div>
      : 
      <div className="flex min-h-full gap-5 items-center justify-center">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-8 w-[400px]" />
      <Skeleton className="h-8 w-[400px]" />
    </div>
  </div>
    }
    </>
  );
};

export default Page;
