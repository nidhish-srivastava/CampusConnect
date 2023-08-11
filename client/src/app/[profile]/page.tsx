import ProfileDetails from "@/components/ProfileDetails"
import { Suspense } from "react"
import Loading from "./loading"

// without react suspense,66% is the lighthouse performance
// with React suspense,89%

const  page =  () => {
 //* Created a fake delay by making this function asynchronous
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
    <Suspense fallback = {<Loading/>}>
    <ProfileDetails/>
    </Suspense>
  )
}

export default page