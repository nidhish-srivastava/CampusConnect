"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConnectContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProfileBaseInfo() {
  const { userProfileObject,setUserProfileObject,setUserDocumentId ,userId} = useConnectContext();

//* AVOID USING USEFFECT HERE IF WE USE THIS AS A LAYOUT,so we will fetch the user data inside the Children component which is also fetched on the route 

  return (
    <>
   <h2 className="text-center text-[20px]">
        {userProfileObject?.authId?.username}
      </h2>
      <div className="flex justify-center gap-4 mt-4">
        <Link href={`/${userProfileObject?.authId?.username}/followers`}>
          <Button className="text-[16px]">
            {userProfileObject?.followers?.length}
             <br />
              Followers{" "}
          </Button>
        </Link>
        <Link href={`/${userProfileObject?.authId?.username}/following`}>
          <Button className="text-[16px]">
            {userProfileObject?.following?.length}
             <br />
              Following{" "}
          </Button>
        </Link>
      </div>
    </>
  )
}

export default ProfileBaseInfo