"use client";
import { useConnectContext } from "@/context/context";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { followPromise, unfollowPromise } from "./MyProfile/FollowingCard";

function FetchSingleUser() {
  const { searchedUserProfile, userProfileObject } = useConnectContext();
  const [show, setShow] = useState(false);

  const checkList = () => {
    for (const key in searchedUserProfile) {
      // console.log(key,searchedUserProfile[key]);
      if (key == "followers") {
        const array = searchedUserProfile[key];
        const filter = array.find((e) => e === userProfileObject?._id);

        if (filter) {
          console.log(true);
          setShow(true);
        } else {
          console.log(false);
          setShow(false);
        }
      }
    }
  };
  const follow = async () => {
    const response = await followPromise(
      searchedUserProfile?._id,
      userProfileObject?._id
    );
    console.log(response);
    setShow(true);
  };

  const unfollow = async () => {
    const response = await unfollowPromise(
      searchedUserProfile?._id,
      userProfileObject?._id
    );
    console.log(response);
    setShow(false);
  };

  useEffect(() => {
    checkList()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[show]);  

  return (
    <div>
      <h2 className="text-[20px] text-center">
        {searchedUserProfile?.authId.username}
      </h2>
      <div className="flex gap-4 mt-4 justify-center">
        {/* <button onClick={unfollow}>Unfollow</button> */}
        {/* <Button className="follow-unfollow-btn">Follow</Button> */}
        {show ? (
          <Button
            className="bg-blue-500 hover:bg-violet-600 text-[15px]"
            onClick={unfollow}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            className="bg-blue-500 hover:bg-violet-600 text-[15px]"
            onClick={follow}
          >
            Follow
          </Button>
        )}
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
  );
}

export default FetchSingleUser;
