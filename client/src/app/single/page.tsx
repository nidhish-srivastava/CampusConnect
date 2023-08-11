"use client"

// Lazy loading --> Lighthouse performance 80%
// Suspense with fallback as Loading we get 94%

import dynamic from 'next/dynamic'
// const SearchedUserProfile = dynamic(()=>import('../../components/FetchSingleUser'))
import FetchSingleUser from '../../components/FetchSingleUser'
import { Suspense } from "react"
import Loading from "./loading"

function page() {
  return (
    <Suspense fallback={<Loading/>}>
     <FetchSingleUser/>
    {/* <SearchedUserProfile/> */}
    </Suspense>
  )
}

export default page