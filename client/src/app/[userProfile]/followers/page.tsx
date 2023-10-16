"use client"
import React, { useEffect, useState }  from 'react'
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import { UserType } from '@/types';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useConnectContext } from '@/context/context';
import { baseUrl } from '@/lib/utils';

const page =  () => {
  const { userProfile } = useParams();
  const {userDocumentId} = useConnectContext()
  const [followers,setFollowers] = useState<UserType[]>([])

  const getFollowers = async():Promise<any> =>{
    const response = await fetch(`${baseUrl}/user/followers/${userProfile}`)
    return response.json()
  }

  // const follow = async(followUserId : string)=>{
  //   await followPromise(followUserId,userDocumentId)
  //   setCheck(true)
  // }

  const removeFollower = async(removeUserId : string)=>{
     await fetch(`${baseUrl}/user/remove`,{
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
          const followers = await getFollowers()
          console.log(followers);
          setFollowers(followers.followers)
        } catch (error) {}
      }
      checkFollowingFollowers()
  },[])

  return (
     <div
      className={`flex flex-col mx-auto items-center mt-20 gap-12 ${fontMontserrat.className} `}
    >
      {followers?.map((e,i)=>(
        <div className='w-1/2'>
              <div className='flex items-center justify-between'>
            <Link href={`/${e.authId.username}`}  key={i}>
                <div className='gap-8 flex items-center'>
            <Image
            src = {e.authId.dp}
            width={60}
            height={60}
            alt='dp'
            />
             <h3 className="text-xl">{e?.authId?.username}</h3>
             </div>
             </Link>
            <Button
            className="follow-unfollow-btn"
            onClick={()=>removeFollower(e._id)}
            >
            Remove
            </Button>
            </div>
            </div>
      ))}
    </div>
  )
}

export default page