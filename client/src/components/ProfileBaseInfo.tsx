import React, { Fragment } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { UserType } from '@/context/context';
import { Button } from './ui/button';

const ProfileBaseInfo = ({ profileObject }: { profileObject: UserType }) => {
  return (
    <Fragment>
    <div className="flex justify-center gap-10 items-center">
    <Image
      src={profileObject?.authId?.dp}
      width={100}
      height={100}
      alt="Picture of the author"
    />
    <h2 className="text-center text-[20px]">
      {profileObject?.authId?.username}
    </h2>
  </div> 
     <div className="flex justify-center gap-4 mt-4">
     <Link href={`/${profileObject?.authId?.username}/followers`}>
       <Button className="text-[16px]">
         {profileObject?.followers?.length}
         <br />
         Followers{" "}
       </Button>
     </Link>
     <Link href={`/${profileObject?.authId?.username}/following`}>
       <Button className="text-[16px]">
         {profileObject?.following?.length}
         <br />
         Following{" "}
       </Button>
     </Link>
   </div>   
      </Fragment>
  )
}

export default ProfileBaseInfo