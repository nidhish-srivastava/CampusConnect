"use client"
import { useConnectContext } from "@/context/context";
import { baseUrl } from "@/utils"
import { useEffect, useState } from "react";

function Notification() {
  const {userId} = useConnectContext()
  
  const [notificationInfo,setNotificationInfo] = useState({})
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
    <div className="w-[60%] mx-auto my-4 p-8">
      <h1 className="font-semibold text-3xl">Notifications</h1>
      <div>
        {
          // notificationInfo.notification
        }
      </div>
    </div>
  )
}

export default Notification