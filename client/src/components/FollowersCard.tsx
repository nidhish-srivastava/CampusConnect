"use client"
import { useConnectContext } from "@/context/context";
import { useEffect,useState } from "react";
import { FollowersFollowingType } from "@/context/context";

function FollowersCard() {
const {userDocumentId} = useConnectContext()  
const [followers, setFollowers] = useState<FollowersFollowingType[]>();

const getFollowers = async () => {
  const response = await fetch(
    `http://localhost:4000/user/followers/${userDocumentId}`
  );
  const data = await response.json();
  console.log(data);
  setFollowers(data);
};
useEffect(()=>{
  getFollowers()
},[])
  return (
    <div>
        {followers?.map(e=>(
          <h2 className="text-sm">{e?.authId?.username}</h2>
        ))}
      
    </div>
  )
}

export default FollowersCard