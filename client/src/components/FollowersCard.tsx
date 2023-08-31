"use client";
import { useConnectContext } from "@/context/context";
import { Fragment, useEffect, useState } from "react";
import { FollowersFollowingType } from "@/context/context";
import { Button } from "./ui/button";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });

function FollowersCard() {
  const { userDocumentId,followers,setFollowers,following,changeBtn,setChangeBtn } = useConnectContext();
  // const [followers, setFollowers] = useState<FollowersFollowingType[] | null>([]);
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
    const response = await fetch(`http://localhost:4000/user/remove`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, unfollowUserId }),
    });
    const data = await response.json();
    console.log(data);
  };

  const follow = async(followUserId : string) =>{
    const response = await fetch(`http://localhost:4000/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, followUserId }),
      cache : "no-cache"
    });
    const data = await response.json();
    console.log(data);
  }

  const unfollow = async (unfollowUserId: string) => {
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
    <>
    <h2 className="text-left ml-10 text-xl mt-10">Followers</h2>
    <div
    className={`grid grid-cols-2 w-[20%] mx-auto items-center mt-10  gap-10 ${fontMontserrat.className} `}
    >
      { 
       followers?.map((e, i) => (
        <Fragment key={i}>
          <label className="text-xl">{e?.authId?.username}</label>
          {
            <div className="flex gap-4">
          <Button onClick={()=>remove(e?._id)} className="follow-unfollow-btn">
            Remove
          </Button>
          {
            !following?.find(e1=>e1._id == e._id) ? (
                 <Button className="follow-unfollow-btn"
              onClick={()=>follow(e._id)}
                 >Follow</Button>
            )
            :(
              <Button className="follow-unfollow-btn"
              onClick={()=>unfollow(e._id)}
              >Unfollow</Button>
            )
          }
            </div>
          }
        </Fragment>
          )
          )}
    </div>
          </>
  );
}

export default FollowersCard;
