import { useConnectContext } from "@/context/context"
import {useRouter} from "next/navigation"

async function SearchResults() {
    const router = useRouter()
    const {searchResultArray,setSearchUserProfile} = useConnectContext()
    
  const fetchSingleSearchedUserData = async(id : string,username : string) =>{
    const response = await fetch(`http://localhost:4000/user/${id}`)
    const data = await response.json()
    setSearchUserProfile(data)
    router.push('/search')
  }

  return (
    <div className="w-1/2 mx-auto my-8">
    {searchResultArray?.map((e)=>{
      return(
        <div className="p-4 border- border-2 bg-transparent">
          {/* <Link href={`/${e._id}`}> */}
        <h2 className="cursor-pointer" onClick={()=>fetchSingleSearchedUserData(e._id,e.username)}>{e.username}</h2>
          {/* </Link> */}
        </div>
      )
    })}
  </div>
  )
}

export default SearchResults