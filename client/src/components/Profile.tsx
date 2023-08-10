"use client";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConnectContext } from "@/context/context";
import dynamic from 'next/dynamic'
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

  // const getCollegeInfo = async() =>{
  //   const response = await fetch(`http://localhost:4000/user/college/${userDocumentId}`)
  //   const data = await response.json()
  //   console.log(data);
  // }

  return (
    <>
      <div className="flex justify-center gap-4 mt-10">
        <Button className="text-sm" onClick={getFollowers}>
          {userProfileObject?.followers?.length} <br /> Followers{" "}
        </Button>
        <Button className="text-sm" onClick={getFollowing}>
          {userProfileObject?.following?.length} <br /> Following{" "}
        </Button>
      </div>
        <FollowersCard followers = {followers}/>
        <FollowingCard following={following}/>
      {/* <div>
        {following.map((e: any) => {
          return <h2 className="text-sm">{e?.authId?.username}</h2>;
        })}
      </div> */}
      {userProfileObject?.github?.length ?? 0 > 1 ? (  //* nullish coalescing operator providing default value 0
        <></>
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
