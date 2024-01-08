import { AuthId } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROJECT_NAME = "CampusConnect"

//  const baseUrl = `http://localhost:4000`
 const baseUrl = `https://campus-connect-one.vercel.app`

const defaultDp = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"


 const debounce = (query:string,fn:()=>void,setSearchResults : (setSearchResults : AuthId[])=>void )=>{
  return setTimeout(()=>{
    if(query.length>1) fn()
    if(query.length==0) setSearchResults([])
  },1000)
}

const followPromise = async (
    followUserId: string | undefined,
    userDocumentId: string | undefined
  ): Promise<any> => {
    return await fetch(`${baseUrl}/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, followUserId }),
    });
  };
  

  const unfollowPromise = async(
    unfollowUserId : string | undefined,
    userDocumentId : string | undefined
  ) : Promise<any> =>{
   return await fetch(`${baseUrl}/user/unfollow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userDocumentId,
        unfollowUserId
      }),
    });
  }
  
  const checkFollowersFollowingPromise = async(userId : string | undefined,myId : string) =>{
  const response = await fetch(`${baseUrl}/user/followingfollowers/check`,
  {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
    },
    body : JSON.stringify({
      userId : userId,
      myId : myId
    })
  })
  return response.json()
}
  
export {
  checkFollowersFollowingPromise,
  unfollowPromise,
  followPromise,
  debounce,
  defaultDp,
  baseUrl,
  PROJECT_NAME
}