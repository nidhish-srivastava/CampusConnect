"use client"
import React, { Fragment, useEffect, useState } from "react";
import { UserType } from "@/types";
import { useParams } from "next/navigation";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import Image from "next/image";
import Link from "next/link";
import { baseUrl } from "@/lib";

const Page = () => {
  const { userProfile } = useParams();
  const [data,setData] = useState<UserType[]>([])
  useEffect(()=>{
    const getFollowing = async ()=> {
      const response = await fetch(`${baseUrl}/user/following/${userProfile}`);
      const data = await  response.json();
      // console.log(data);
      setData(data.following)
    };
    getFollowing()
  })
  return (
    <div
      className={`flex flex-col items-center justify-center gap-10 w-[20%] mx-auto mt-20 ${fontMontserrat.className} `}
    >
      {data?.map((e,i)=>{
        return(
          <Link href={`/${e.authId.username}`} key={i}>
            <div className=" grid grid-cols-2 items-center">
             <label className="text-xl">{e?.authId?.username}</label>
            <Image
            src = {e?.authId?.dp}
            width={60}
            height={60}
            alt='dp'
            />
              </div>
          </Link>
        )
      })}
    </div>
  );
};

export default Page;
