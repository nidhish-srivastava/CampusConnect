import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "@/types";
import { Button } from "./ui/button";
import { checkFollowersFollowingPromise, followPromise,unfollowPromise } from "@/utils";
import { useConnectContext } from "@/context/context";

const ProfileBaseInfo = ({ profileObject }: { profileObject: UserType | undefined }) => {
  // NOw i need to check wether I follow this person or not
  // If i follow this person,show unfollow btn
  // If i dont follow this person,show follow btn

  // I need to check in my following list,so first i need my documentId
  const {user, userDocumentId } = useConnectContext();
  const [check,setCheck] = useState(false)
  
  const unfollow = async () => {
    await unfollowPromise(profileObject?._id,userDocumentId)
    setCheck(false)
  };
  
  const follow = async () => {
    await followPromise(profileObject?._id,userDocumentId)
    setCheck(true)
  };
  
  useEffect(() => {
      const checkFollowingFollowers = async () => {
        try {
          const data = await checkFollowersFollowingPromise(profileObject?._id,userDocumentId)
          data=="true" ?  setCheck(true) : setCheck(false)
        } catch (error) {}
      };
    checkFollowingFollowers();
  });




  return (
    <div className="flex justify-center gap-10 items-center">
      <div>
        <Image
          src={profileObject?.authId?.dp}
          width={80}
          height={80}
          alt="Picture of the author"
        />
        <h2 className="text-center text-[20px] mt-2">
          {profileObject?.authId?.username}
        </h2>
      </div>
      <div className="">
        <div className="flex gap-2">
          <Link href={`/${profileObject?.username}/followers`}>
            <Button className="text-[16px] px-2 py-2">
              {profileObject?.followers?.length}
              <br />
              Followers{" "}
            </Button>
          </Link>
          <Link href={`/${profileObject?.authId?.username}/following`}>
            <Button className="text-[16px] px-2 py-2">
              {profileObject?.following?.length}
              <br />
              Following{" "}
            </Button>
          </Link>
        </div>
        <div className="mt-4 text-center">{
           profileObject?.username !== user &&  user.length!=0 ? <>
            {check
            ?
            <Button className="bg-blue-500 hover:bg-violet-600 text-[15px]" onClick={unfollow}>
              Unfollow
            </Button>
            : 
              <Button className="bg-blue-500 hover:bg-violet-600 text-[15px]" onClick={follow}>
              Follow
            </Button>
            }
          </> : null
        }
        </div>
      </div>
    </div>
  );
};

export default ProfileBaseInfo;
