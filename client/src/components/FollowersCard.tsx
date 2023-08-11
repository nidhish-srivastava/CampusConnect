"use client"
import { useConnectContext } from "@/context/context";

function FollowersCard() {
const {followers} = useConnectContext()  
  return (
    <div>
        { followers?.map((e: any) => {
          return <h2 className="text-sm">{e?.authId?.username}</h2>;
        })}
      
    </div>
  )
}

export default FollowersCard