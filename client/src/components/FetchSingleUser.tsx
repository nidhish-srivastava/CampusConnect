"use client"
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
      <div className="grid grid-cols-2 gap-4 items-center w-4/6 mx-auto my-10">
          {/* <div> */}
          <Button className="profile-btn-label">College</Button>
          <label>{searchedUserProfile?.college}</label>
          {/* </div> */}
          {/* <div> */}
          <Button className="profile-btn-label">College City</Button>
          <label>{searchedUserProfile?.collegeCity}</label>
          {/* </div> */}
          {/* <div> */}
          <Button className="profile-btn-label">College Location</Button>
          <label>{searchedUserProfile?.collegeLocation}</label>
          {/* </div> */}
          <Button className="profile-btn-label">Email</Button>
          <label>{searchedUserProfile?.email}</label>

          <Button className="profile-btn-label">Github</Button>
          <a href={searchedUserProfile?.github}>{searchedUserProfile?.github}</a>

          <Button className="profile-btn-label">LinkedIn</Button>
          <a href={searchedUserProfile?.linkedin}>
            {searchedUserProfile?.linkedin}
          </a>

          <Button className="profile-btn-label">Leetcode</Button>
          <a href={searchedUserProfile?.leetcode}>
            {searchedUserProfile?.leetcode}
          </a>
        </div>
    </div>
  )
}

export default FetchSingleUser