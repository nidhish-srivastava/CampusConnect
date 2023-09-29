import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "@/types";
import { Button } from "./ui/button";
import { useConnectContext } from "@/context/context";

const ProfileBaseInfo = ({ profileObject }: { profileObject: UserType }) => {
  // NOw i need to check wether I follow this person or not
  // If i follow this person,show unfollow btn
  // If i dont follow this person,show follow btn

  // I need to check in my following list,so first i need my documentId
  const { userDocumentId } = useConnectContext();
  const [check,setCheck] = useState(false)

  const checkFollowing = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/following/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: profileObject._id,
            myId: userDocumentId,
          }),
        }
      );
      const data = await response.json();
      setCheck(data)
    } catch (error) {}
  };
  const follow = async () => {
    await fetch(`http://localhost:4000/user/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDocumentId: userDocumentId,
        followUserId: profileObject._id,
      }),
    });
  };
  const unfollow = async () => {
    await fetch(`http://localhost:4000/user/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDocumentId: userDocumentId,
        unfollowUserId: profileObject._id,
      }),
    });
  };
   useEffect(()=>{
    checkFollowing()
   },[])

  return (
    <div className="flex justify-center gap-10 items-center">
      {/* <button onClick={checkFollowing}>Check</button> */}
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
          <Link href={`/${profileObject?.authId?.username}/followers`}>
            <Button className="text-[16px] px-2 py-2">
              {profileObject?.followers?.length}
              <br />
              Followers{" "}
            </Button>
          </Link>
          <Link href={`/${profileObject?.authId?.username}/following`}>
            <Button className="text-sm px-2 py-2">
              {profileObject?.following?.length}
              <br />
              Following{" "}
            </Button>
          </Link>
        </div>
        <div className="mt-4 text-center">
          {check && 
          <Button className="follow-unfollow-btn" onClick={unfollow}>
            UnFollow
          </Button>
          }
          {!check
          &&
          <Button className="follow-unfollow-btn mx-2" onClick={follow}>
            Follow
          </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileBaseInfo;
