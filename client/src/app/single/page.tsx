"use client"
//* Using Lazy Loading
import dynamic from 'next/dynamic'
const SearchedUserProfile = dynamic(()=>import('../../components/FetchSingleUser'))
// import { Suspense } from "react"
// import Loading from "./loading"

function page() {
  return (
    // <Suspense fallback={<Loading/>}>
    // <FetchSingleUser/>
    <SearchedUserProfile/>
    // </Suspense>
  )
}

export default page