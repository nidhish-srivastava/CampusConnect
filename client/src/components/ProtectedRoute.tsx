import { useConnectContext } from "@/context/context"
import { useRouter } from "next/navigation"
import {  useEffect } from "react"

type props = {
  children : React.ReactNode
  isAuthenticated ?: boolean
}

function ProtectedRoute({children} : props) {
    const router = useRouter()
    const {user} = useConnectContext()
    useEffect(()=>{
        if( user == undefined){
            router.replace('/login')
        }
    },[user,router])
  return (
    user != undefined ? children : null
  )
}

export default ProtectedRoute