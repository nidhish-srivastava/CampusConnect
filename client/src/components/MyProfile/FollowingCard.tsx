"use client";
import { useConnectContext } from "@/context/context";
import { Fragment, useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Button } from "../ui/button";
const fontMontserrat = Montserrat({ subsets: ["latin"] });

export const followPromise = async (
  followUserId: string | undefined,
  userDocumentId: string | undefined
): Promise<any> => {
  const response = await fetch(`http://localhost:4000/user/follow`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userDocumentId, followUserId }),
  });
  return await response.json();
};

export const unfollowPromise = async(
  unfollowUserId : string | undefined,
  userDocumentId : string | undefined
) : Promise<any> =>{
  const response = await fetch(`http://localhost:4000/user/unfollow`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userDocumentId,
      unfollowUserId
    }),
  });
  return await response.json()
}

function FollowingCard() {
  // const [following, setFollowing] = useState<FollowersFollowingType[]>([]);
  const { userProfileObject, following, setFollowing } = useConnectContext();
  const [show, setShow] = useState(false);

  const getFollowing = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/following/${userProfileObject?._id}`
      );
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        setFollowing(data);
      }
    } catch (error) {}
  };

  const unfollow = async (unfollowUserId: string) => {
    const data = await unfollowPromise(unfollowUserId,userProfileObject?._id)
    console.log(data);
    setShow(true);
  };

  const follow = async (followUserId: string) => {
    const data = await followPromise(followUserId, userProfileObject?._id);
    console.log(data);
    setShow(false);
  };

  useEffect(() => {
    getFollowing();
  }, []);
  return (
    <div
      className={`grid grid-cols-2 w-[20%] mx-auto items-center mt-20 gap-10 ${fontMontserrat.className} `}
    >
      {following?.map((e, i) => {
        return (
          <Fragment key={i}>
            <label className="text-xl">{e?.authId?.username}</label>
            {!show ? (
              <Button
                className="follow-unfollow-btn"
                onClick={() => unfollow(e._id)}
              >
                UnFollow
              </Button>
            ) : (
              <Button
                className="follow-unfollow-btn"
                onClick={() => follow(e._id)}
              >
                Follow
              </Button>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default FollowingCard;
