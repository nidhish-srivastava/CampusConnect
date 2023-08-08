"use client";
import { useState } from "react";
import { useConnectContext } from "../../context/context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function page() {
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

  return (
    <div>
      <Avatar>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h2 className="text-center text-xl">{user}</h2>
      <div className="flex justify-center gap-4 mt-10">
        <Button className="text-sm" onClick={getFollowers}>
          {userProfileObject?.followers?.length} <br /> Followers{" "}
        </Button>
        <Button className="text-sm" onClick={getFollowing}>
          {userProfileObject?.following?.length} <br /> Following{" "}
        </Button>
      </div>
      {followers.map((e: any) => {
        return <h2 className="text-sm">{e?.authId?.username}</h2>;
      })}
      {following.map((e: any) => {
        return <h2 className="text-sm">{e?.authId?.username}</h2>;
      })}
    </div>
  );
}

export default page;
