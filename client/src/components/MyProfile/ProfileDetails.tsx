"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConnectContext } from "@/context/context";
import { useEffect } from "react";
import ProfileDetail from "../ProfileInformation";

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


  return (
    <>
      {userProfileObject?.github?.length ?? 0 > 1 ? ( //* nullish coalescing operator providing default value 0
        // <div className="flex flex-col gap-4 items-start w-4/6 mx-auto my-10">

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
