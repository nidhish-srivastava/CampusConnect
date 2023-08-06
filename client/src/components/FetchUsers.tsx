"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useConnectContext } from "../../context/context";

type AuthId = {
  username: string;
  _id: number;
};

type UserType = {
  authId: AuthId;
  followers: string[];
  following: string[];
};

function FetchUsers() {
  const { userId, user } = useConnectContext();
  console.log(userId,user);
  
  const [fetchUser, setFetchUser] = useState([]);
  const FetchUsers = async () => {
    const response = await fetch(`http://localhost:4000/user`, {
      method: "GET",
    });
    const data = await response.json();
    setFetchUser(data);
    console.log(data);
  };

  const follow = async (followUserId: number) => {
    const response = await fetch(`http://localhost:4000/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, followUserId }),
    });
    const data = await response.json()
    console.log(data);
  };
  const unfollow = async () => {};
  useEffect(() => {
    FetchUsers();
  }, []);
  return (
    <div>
      <h2 className="text-center">{user}</h2>
      {fetchUser?.map((e: UserType) => (
        <>
          <h2 className="text-2xl my-2">{e?.authId?.username}</h2>
          <h2>Followers : {e?.followers.length}</h2>
          <h2>Following : {e?.following.length}</h2>
          {
            <div>
              <Button
                onClick={() => follow(e?.authId._id)}
                className="p-2 text-sm mx-2 bg-green-700"
              >
                Follow
              </Button>
              <Button
                onClick={() => unfollow()}
                className="p-2 text-sm mx-2 bg-orange-400"
              >
                UnFollow
              </Button>
            </div>
          }
        </>
      ))}
    </div>
  );
}

export default FetchUsers;
