"use client";

import {  useState } from "react";
import { Button } from "./ui/button";
import { useConnectContext } from "../context/context";

type AuthId = {
  username: string;
  _id: number;
};

export type UserType = {
  _id : string;
  authId: AuthId;
  followers: string[];
  following: string[];
  email: String,
  github: String,
  linkedin: String,
  leetcode: String,
  college: String,
  collegeLocation: String
};

function FetchUsers() {
  const { userId, user, userDocumentId } = useConnectContext();
  const [fetchUser, setFetchUser] = useState([]);

  const FetchAll = async () => {
    const response = await fetch(`http://localhost:4000/user/fetchAll/${userDocumentId}`,{
      method : "GET",
      headers : {
        Authorization : "Bearer "  + localStorage.getItem("token")
      }
    });
    const data = await response.json();
    console.log(data);
    setFetchUser(data)
  };



  const follow = async (followUserId: string) => {
    const response = await fetch(`http://localhost:4000/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, followUserId }),
    });
    const data = await response.json();
    console.log(data);
  };
  const unfollow = async (unfollowUserId: string) => {
    const response = await fetch(`http://localhost:4000/user/unfollow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, unfollowUserId }),
    });
    const data = await response.json();
    console.log(data);
  };


  return (
    <div>
      <h2 className="text-center">{user}</h2>
      <h2>My user id is {userId}</h2>
      <h2>My user document is {userDocumentId}</h2>
      {fetchUser?.map((e: UserType, i) => (
        <div key={i}>
          <h2 className="text-2xl my-2">{e?.authId?.username}</h2>
          <h2>Followers : {e?.followers.length}</h2>
          <h2>Following : {e?.following.length}</h2>
          {
            <div>
              {!e.followers.find((e) => e == userDocumentId) ? (
                <Button
                  onClick={() => follow(e._id)}
                  className="p-2 text-sm mx-2 bg-green-700"
                >
                  Follow
                </Button>
              ) : (
                <Button
                  onClick={() => unfollow(e._id)}
                  className="p-2 text-sm mx-2 bg-orange-400"
                >
                  UnFollow
                </Button>
              )}
            </div>
          }
        </div>
      ))}
      <Button onClick={FetchAll}>Check</Button>
    </div>
  );
}
export default FetchUsers;
