"use client"
import { useConnectContext } from "@/context/context";


function FollowingCard() {
  const {following} = useConnectContext()
  return (
    <div>
  {  following?.map((e: any) => {
          return <h2 className="text-sm">{e?.authId?.username}</h2>;
        })}
    </div>
  )
}

export default FollowingCard