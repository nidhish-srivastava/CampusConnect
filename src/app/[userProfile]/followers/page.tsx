"use client";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import { UserType } from "@/types";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useConnectContext } from "@/context/context";
import { baseUrl } from "@/utils";
import SkeletonLoader from "@/components/ui/skeleton-loader";

const Page = () => {
  const { userProfile } = useParams();
  const { userDocumentId } = useConnectContext();
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [clickedUserId, setClickedUserId] = useState("");
  const [isRemoved, setIsRemoved] = useState(false);

  const removeFollower = async (removeUserId: string) => {
    setClickedUserId(removeUserId);
    try {
      const response = await fetch(`${baseUrl}/user/remove-follower`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: userDocumentId,
          unfollowUserId: removeUserId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) setIsRemoved(true);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/user/followers/${userProfile}`
        );
        const followers = await response.json();
        setFollowers(followers);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [userProfile]);

  if (loading) {
    return (
      <>
        <h2 className="text-center text-2xl font-medium">Followers</h2>
        <SkeletonLoader />
      </>
    );
  }

  return (
    <>
      <h2 className="text-center text-2xl font-medium">Followers</h2>
      <div className="flex w-fit mx-auto flex-col items-center justify-center text-center py-2 px-6 mt-2">
        {/* <p className="text-sm font-semibold text-blue-600">0 followers</p> */}
        <Button className="text-[14px] py-6 px-2 rounded-[3px]">
          {followers?.length}
          <br />
          Followers{" "}
        </Button>
      </div>
      <div
        className={`flex flex-col mx-auto items-center mt-20 gap-12 ${fontMontserrat.className} `}
      >
        {followers?.map((e: any, i) => (
          <div
            key={i}
            className={`w-1/2 flex items-center ${
              userDocumentId == "" ? "justify-center" : "justify-between"
            }`}
          >
            <Link href={`/${e?.auth?.username}`}>
              <div className="gap-8 flex items-center">
                <Image src={e?.auth?.dp} width={60} height={60} alt="dp" />
                <h3 className="text-xl">{e?.auth?.username}</h3>
              </div>
            </Link>
            {userDocumentId != "" && (
              <>
                {clickedUserId == e.id && isRemoved ? (
                  <Button
                    className="follow-unfollow-btn"
                    // onClick={()=>followUserHandler(e?.id)}
                  >
                    Removed
                  </Button>
                ) : (
                  <Button
                    className="follow-unfollow-btn"
                    onClick={() => removeFollower(e?.id)}
                  >
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
