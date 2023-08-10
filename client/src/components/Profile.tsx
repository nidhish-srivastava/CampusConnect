"use client";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConnectContext } from "@/context/context";
import dynamic from "next/dynamic";
import FollowersCard from "./FollowersCard";
import FollowingCard from "./FollowingCard";

function Profile() {
  const { userProfileObject, user, userDocumentId } = useConnectContext();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const getFollowers = async () => {
    const response = await fetch(
      `http://localhost:4000/user/followers/${userDocumentId}`
    );
    const data = await response.json();
    console.log(data);
    setFollowers(data);
  };

  const getFollowing = async () => {
    const response = await fetch(
      `http://localhost:4000/user/following/${userDocumentId}`
    );
    const data = await response.json();
    console.log(data);
    setFollowing(data);
  };

  // console.log(userProfileObject);

  //* Not in use at the moment
  // const getCollegeInfo = async() =>{
  //   const response = await fetch(`http://localhost:4000/user/college/${userDocumentId}`)
  //   const data = await response.json()
  //   console.log(data);
  // }

  return (
    <>
      <h2 className="text-center text-[20px]">
        {userProfileObject?.authId?.username}
      </h2>
      <div className="flex justify-center gap-4 mt-4">
        <Button className="text-[16px]" onClick={getFollowers}>
          {userProfileObject?.followers?.length} <br /> Followers{" "}
        </Button>
        <Button className="text-[16px]" onClick={getFollowing}>
          {userProfileObject?.following?.length} <br /> Following{" "}
        </Button>
      </div>

      {/* <FollowersCard followers={followers} /> */}
      {/* <FollowingCard following={following} /> */}

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

export default Profile;
