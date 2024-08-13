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
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const { userProfile } = useParams();
  const { userDocumentId } = useConnectContext();
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [clickedUserId, setClickedUserId] = useState("");

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

  return (
    <>
    <h2 className="text-center text-2xl">List of Followers</h2>
      {!loading ? (
        <div
          className={`flex flex-col mx-auto items-center mt-20 gap-12 ${fontMontserrat.className} `}
        >
          {followers?.map((e: any, i) => (
            <div className="w-1/2" key={i}>
              <div className="flex items-center justify-between">
                <Link href={`/${e?.auth?.username}`}>
                  <div className="gap-8 flex items-center">
                    <Image src={e?.auth?.dp} width={60} height={60} alt="dp" />
                    <h3 className="text-xl">{e?.auth?.username}</h3>
                  </div>
                </Link>
                {clickedUserId == e.id ? (
                  <Button className="follow-unfollow-btn">Removed</Button>
                ) : (
                  <Button
                    className="follow-unfollow-btn"
                    onClick={() => removeFollower(e.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-full gap-5 items-center justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-[400px]" />
            <Skeleton className="h-8 w-[400px]" />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
