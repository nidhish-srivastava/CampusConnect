"use client"
import React, { Fragment } from "react";
import { UserType } from "@/types";
import { useParams } from "next/navigation";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import Image from "next/image";
import { Button } from "@/components/ui/button";

const getFollowing = async (user: string | string[]): Promise<UserType[]> => {
  const response = await fetch(`http://localhost:4000/user/following/${user}`);
  return response.json();
};

const page = async () => {
  const { user } = useParams();
  const data : UserType[] = await getFollowing(user);
  return (
    <div
      className={`grid grid-cols-2 w-[20%] mx-auto items-center mt-20 gap-10 ${fontMontserrat.className} `}
    >
      {data?.map((e,i)=>{
        return(
          <Fragment>
             <label className="text-xl">{e?.authId?.username}</label>
            <Image
            src = {e.authId.dp}
            width={70}
            height={70}
            alt='dp'
            />
              <Button
                className="follow-unfollow-btn"
              >
                UnFollow
              </Button>
              <Button
                className="follow-unfollow-btn"
              >
                Follow
              </Button>
          </Fragment>
        )
      })}
    </div>
  );
};

export default page;
