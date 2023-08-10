import { useConnectContext } from "@/context/context"
import { Button } from "./ui/button";

function FetchSingleUser() {
    const {searchedUserProfile} = useConnectContext()
    console.log(searchedUserProfile);
    
  return (
    <div>
      <h2 className="text-lg text-center">{searchedUserProfile?.authId.username}</h2>
      <div className="flex justify-center gap-3 mt-8">
      <Button className="py-6 px-4 mr-3 text-md">Followers <br/>{searchedUserProfile?.followers?.length}</Button>
      <Button className="py-6 px-4 mr-3 text-md">Following <br/>{searchedUserProfile?.following?.length}</Button>
      </div>
    </div>
  )
}

export default FetchSingleUser