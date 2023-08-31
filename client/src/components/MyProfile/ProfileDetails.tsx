"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConnectContext } from "@/context/context";
import { useEffect } from "react";

function ProfileDetails() {
  const { userProfileObject,userId,setUserProfileObject,setUserDocumentId } = useConnectContext();

  const FetchLoggedInUser = async () => {
    const response = await fetch(`http://localhost:4000/user/${userId}`);
    const data = await response.json();
    console.log(data);
    setUserProfileObject(data);
    setUserDocumentId(data?._id);
  };

  useEffect(()=>{
    FetchLoggedInUser()
  },[])

  //* Not in use at the moment
  // const getCollegeInfo = async() =>{
  //   const response = await fetch(`http://localhost:4000/user/college/${userDocumentId}`)
  //   const data = await response.json()
  //   console.log(data);
  // }

  return (
    <>
      {userProfileObject?.github?.length ?? 0 > 1 ? ( //* nullish coalescing operator providing default value 0
        // <div className="flex flex-col gap-4 items-start w-4/6 mx-auto my-10">
        <div className="grid grid-cols-2 gap-4 items-center w-4/6 mx-auto my-10">
          {/* <div> */}
          <Button className="profile-btn-label">College</Button>
          <label>{userProfileObject?.college}</label>

          {/* </div> */}
          {/* <div> */}
          <Button className="profile-btn-label">College City</Button>
          <label>{userProfileObject?.collegeCity}</label>
          {/* </div> */}
          {/* <div> */}
          <Button className="profile-btn-label">College Location</Button>
          <label>{userProfileObject?.collegeLocation}</label>
          {/* </div> */}
          <Button className="profile-btn-label">Email</Button>
          <label>{userProfileObject?.email}</label>

          <Button className="profile-btn-label">Github</Button>
          <a href={userProfileObject?.github}>{userProfileObject?.github}</a>

          <Button className="profile-btn-label">LinkedIn</Button>
          <a href={userProfileObject?.linkedin}>
            {userProfileObject?.linkedin}
          </a>

          <Button className="profile-btn-label">Leetcode</Button>
          <a href={userProfileObject?.leetcode}>
            {userProfileObject?.leetcode}
          </a>
        </div>
      ) : (
        <div className="text-center mt-6">
          <Link href={`/create-profile`}>
            <Button className="text-sm bg-amber-600 px-3">
              Create your Profile
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default ProfileDetails;
