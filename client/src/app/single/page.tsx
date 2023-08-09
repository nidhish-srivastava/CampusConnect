import FetchSingleUser from "@/components/FetchSingleUser"
import { Suspense } from "react"
import Loading from "./loading"

function page() {
  return (
    <Suspense fallback={<Loading/>}>
    <FetchSingleUser/>
    </Suspense>
  )
}

export default page