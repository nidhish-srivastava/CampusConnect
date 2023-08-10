import Profile from "@/components/Profile"
import { Suspense } from "react"
import Loading from "./loading"

const  page =  () => {
  // //* Created a fake delay by making this function asynchronous
// const  page = async () => {
  // const delay = async() =>{
  //   return new Promise<void>((resolve)=>{
  //     setTimeout(()=>{
  //       return resolve()
  //     },2000)
  //   })
  // }
  // await delay()
  return (
    <div>
      <Suspense fallback = {<Loading/>}>
      <Profile/>
      </Suspense>
    </div>
  )
}

export default page