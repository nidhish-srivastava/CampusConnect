import { useConnectContext } from "@/context/context"
import { useParams, usePathname, useRouter } from "next/navigation"
import {  useEffect } from "react"

type props = {
  children : React.ReactNode
  profileCreated ?: boolean
}

function ProtectedRoute({children} : props) {
    const router = useRouter()
    const {user} = useConnectContext()
    const path = usePathname()
    
    useEffect(()=>{
        if( user == undefined){
          if(path.includes("/signup")){
            router.replace('/signup')
          }
          else{
            router.replace('/login')
          }
        }
        else{
          router.replace('/')
        }
    },[user,router])
  return (
    children
  )
}

export default ProtectedRoute