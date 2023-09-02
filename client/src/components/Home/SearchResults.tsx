import { useConnectContext } from "@/context/context"
import {useRouter} from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    {searchResultArray?.map((e,i)=>{
      return(
        <div className="p-4 mb-2 border-2 bg-transparent flex gap-8 items-center" key={i} >
          {/* <Link href={`/${e._id}`}> */}
          <Avatar>
                <AvatarImage src={e.dp} alt="@shadcn" />
                <AvatarFallback>{e.username.charAt(0)}</AvatarFallback>
              </Avatar>
        <h2 className="cursor-pointer" onClick={()=>fetchSingleSearchedUserData(e._id,e.username)}>{e.username}</h2>
          {/* </Link> */}
        </div>
      )
    })}
  </div>
  )
}

export default SearchResults