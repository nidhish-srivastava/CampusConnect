
export const followPromise = async (
    followUserId: string | undefined,
    userDocumentId: string | undefined
  ): Promise<any> => {
    return await fetch(`http://localhost:4000/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, followUserId }),
    });
  };
  
  export const unfollowPromise = async(
    unfollowUserId : string | undefined,
    userDocumentId : string | undefined
  ) : Promise<any> =>{
   return await fetch(`http://localhost:4000/user/unfollow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userDocumentId,
        unfollowUserId
      }),
    });
  }
  
export const checkFollowersFollowingPromise = async(userId : string,myId : string) =>{
  const response = await fetch(`http://localhost:4000/user/followingfollowers/check`,
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
  