"use client"
import React, { useEffect, useState }  from 'react'
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import { Button } from '@/components/ui/button';
import { Fragment } from 'react';
import { UserType } from '@/types';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { checkFollowersFollowingPromise } from '@/utils';
import { useConnectContext } from '@/context/context';
import { followPromise } from '@/utils';

const page =  () => {
  const [check,setCheck] = useState(false)
  const {userDocumentId} = useConnectContext()
  const {user} = useParams()
  const [followers,setFollowers] = useState<UserType[]>([])

  const getFollowers = async(user:string | string[]) =>{
    const response = await fetch(`http://localhost:4000/user/followers/${user}`)
    return await response.json()
  }

  const follow = async(followUserId : string)=>{
    await followPromise(followUserId,userDocumentId)
    setCheck(true)
  }

  const removeFollower = async(removeUserId : string)=>{
     await fetch(`http://localhost:4000/user/remove`,{
      method : "PUT",
      body : JSON.stringify({
        userDocumentId : userDocumentId,
        unfollowUserId : removeUserId
      }),
      headers : {
        "Content-Type" : "application/json"
      }
    })
  }


  useEffect(()=>{
      const checkFollowingFollowers = async() =>{
        try {
          const followers = await getFollowers(user)
          setFollowers(followers)
          //* This logic is tough since now i have to check in all the followers wether i follow them or not
          // const response = await checkFollowersFollowingPromise(followers._id,userDocumentId)
          // await Promise.all([followers,response])
          // response=="true" ?  setCheck(true) : setCheck(false)
        } catch (error) {}
      }
      checkFollowingFollowers()
  },[])

  return (
     <div
      className={`grid grid-cols-2 w-[20%] mx-auto items-center mt-20 gap-10 ${fontMontserrat.className} `}
    >
      {followers.map((e,i)=>(
        <Fragment key={i}>
             <label className="text-xl">{e?.authId?.username}</label>
            <Image
            src = {e.authId.dp}
            width={70}
            height={70}
            alt='dp'
            />
                <Button
                className="follow-unfollow-btn"
                onClick={()=>removeFollower(e._id)}
              >
                Remove
              </Button>
              <Button
                className="follow-unfollow-btn"
                onClick={()=>follow(e._id)}
              >
                Follow
              </Button>
        </Fragment>
      ))}
    </div>
  )
}

export default page