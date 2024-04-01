"use client"
import { useConnectContext } from "@/context/context";
import { notificationInfo } from "@/types";
import { baseUrl, dateFormatter } from "@/utils"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



function Notification() {
  const {userId} = useConnectContext()
  
  const [notificationInfo,setNotificationInfo] = useState<notificationInfo[]>([])
  useEffect(()=>{
    const fetchNotifications = async() =>{
      const response = await fetch(`${baseUrl}/user/notification/${userId}`)
      const data = await response.json()
      console.log(data);
      setNotificationInfo(data)
    }
    fetchNotifications()
  },[])
  
  return (
    <div className="sm:w-[60%] mx-auto my-4 p-8 ">
      <h1 className="font-semibold text-3xl">Notifications</h1>
      <div className="flex flex-col sm:w-[80%] mx-auto p-8  mt-8">
        {
          notificationInfo.map(e=>(
            <div key={e._id} className="flex flex-col gap-2">
              <div>
                <Link href={`/${e?.sender.username}`}>
              <Image
              src={
                e?.sender.dp 
              }
              alt="dp"
              width={40}
              height={40}
              className="rounded-[50%]"
              />
              </Link>
              </div>
              <div>
                <h2 className="">
                  <b className="text-[1.2rem]">
              {e?.sender.username} 
                  </b> followed you
                </h2>
              </div>
              <h3 className="text-slate-600">
              {
                dateFormatter(e?.createdAt)
              }
              </h3>
              <hr className="my-4"/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Notification