"use client"
import { useConnectContext } from "@/context/context";
import { useEffect, useState } from "react";

function FollowingCard() {
  const [following, setFollowing] = useState([]);
  const {userDocumentId} = useConnectContext()

  const getFollowing = async () => {
    const response = await fetch(
      `http://localhost:4000/user/following/${userDocumentId}`
    );
    const data = await response.json();
    console.log(data);
    setFollowing(data);
  };
  useEffect(()=>{
       getFollowing()
  },[])
  return (
    <div>
  {  following?.map((e: any) => {
          return <h2 className="text-sm">{e?.authId?.username}</h2>;
        })}
    </div>
  )
}

export default FollowingCard