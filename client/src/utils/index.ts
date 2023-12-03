import { baseUrl } from "@/lib";


export const defaultDp = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"


export const followPromise = async (
    followUserId: string | undefined,
    userDocumentId: string | undefined
  ): Promise<any> => {
    return await fetch(`${baseUrl}/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, followUserId }),
    });
  };
  
  export const unfollowPromise = async(
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
  
export const checkFollowersFollowingPromise = async(userId : string | undefined,myId : string) =>{
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
  