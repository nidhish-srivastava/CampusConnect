"use client";
import { useConnectContext } from "@/context/context";
import { Fragment, useEffect, useState } from "react";
import { FollowersFollowingType } from "@/context/context";
import { Button } from "./ui/button";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });

function FollowersCard() {
  const { userDocumentId } = useConnectContext();
  const [followers, setFollowers] = useState<FollowersFollowingType[] | null>([]);
  const [show,setShow] = useState(false)
  const getFollowers = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/followers/${userDocumentId}`
      );
      if(response.status==200){
        const data = await response.json();
        console.log(data);
        setFollowers(data);
      }
    } catch (error) {
            
    }
  };
  const remove = async (unfollowUserId: string) => {
    const response = await fetch(`http://localhost:4000/user/unfollow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, unfollowUserId }),
    });
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    getFollowers();
  }, []);
  return (
    <div
      className={`grid grid-cols-2 w-[20%] mx-auto items-center mt-20 gap-10 ${fontMontserrat.className} `}
    >
      { 
       followers?.map((e, i) => (
        <Fragment key={i}>
          <label className="text-xl">{e?.authId?.username}</label>
          {
          <Button onClick={()=>remove(e?._id)} className=" bg-yellow-600 text-sm px-2 py-0 w-fit">
            Remove
          </Button>
          }
        </Fragment>
          )
      )}
    </div>
  );
}

export default FollowersCard;
