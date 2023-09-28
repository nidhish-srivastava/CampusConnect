"use client";
import { FollowersFollowingType } from "@/context/context";
import { Fragment, useEffect, useState} from "react";
import { Button } from "./ui/button";
import { Montserrat } from "next/font/google";
import url from '@/app/page'
import { useParams } from "next/navigation";
const fontMontserrat = Montserrat({ subsets: ["latin"] });

function FollowersCard() {
  const {user} = useParams()
  const [followers,setFollowers] = useState<FollowersFollowingType[]>([])
  const [following,setFollowing] = useState<FollowersFollowingType[]>([])

  
  const getFollowers = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/followers/${user}`
      );
      if(response.status==200){
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
            
    }
  }
  const getFollowing = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/following/${user}`
      );
      if(response.status==200){
        const data = await response.json();
        console.log(data);
        setFollowing(data)
      }
    } catch (error) {
            
    }
  }
  const remove = async (unfollowUserId: string) => {
    const response = await fetch(`http://localhost:4000/user/remove`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, unfollowUserId }),
    });
    const data = await response.json();
  };

  const follow = async(followUserId : string) =>{
    const response = await fetch(`http://localhost:4000/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, followUserId }),
    });
    const data = await response.json();
    setFollowers(data)
  }

  const unfollow = async (unfollowUserId: string) => {
    const response = await fetch(`http://localhost:4000/user/unfollow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, unfollowUserId }),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getFollowers()
  },[]);
  useEffect(()=>{
    getFollowing()
  },[])
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
