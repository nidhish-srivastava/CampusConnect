"use client";
import { FollowersFollowingType, useConnectContext } from "@/context/context";
import {Fragment, useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Button } from "./ui/button";
const fontMontserrat = Montserrat({ subsets: ["latin"] });

function FollowingCard() {
  const [following, setFollowing] = useState<FollowersFollowingType[]>([]);
  const { userDocumentId } = useConnectContext();

  const getFollowing = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/following/${userDocumentId}`
      );
      if(response.status==200){
        const data = await response.json();
        console.log(data);
        setFollowing(data);
      }
    } catch (error) {
      
    }
  };
  
  useEffect(() => {
    getFollowing();
  }, []);
  return (
    <div
      className={`grid grid-cols-2 w-[20%] mx-auto items-center mt-20 gap-10 ${fontMontserrat.className} `}
    >
      {following?.map((e, i) => {
        return (
          <Fragment key={i}>
            <label className="text-xl">{e?.authId?.username}</label>
            <Button className=" bg-yellow-600 text-sm px-2 py-0 w-fit">
              Follow
            </Button>
          </Fragment>
        );
      })}
    </div>
  );
}

export default FollowingCard;
