import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "@/types";
import { Button } from "./ui/button";

const ProfileBaseInfo = ({ profileObject }: { profileObject: UserType }) => {
  return (
    <div className="flex justify-center gap-10 items-center">
      <div>
        <Image
          src={profileObject?.authId?.dp}
          width={80}
          height={80}
          alt="Picture of the author"
        />
        <h2 className="text-center text-[20px] mt-2">
          {profileObject?.authId?.username}
        </h2>
      </div>
      <div className="">
        <div className="flex gap-2">
        <Link href={`/${profileObject?.authId?.username}/followers`}>
          <Button className="text-[16px] px-2 py-2">
            {profileObject?.followers?.length}
            <br />
            Followers{" "}
          </Button>
        </Link>
        <Link href={`/${profileObject?.authId?.username}/following`}>
          <Button className="text-sm px-2 py-2">
            {profileObject?.following?.length}
            <br />
            Following{" "}
          </Button>
        </Link>
        </div>
        <div className="mt-4 text-center">
          <Button className="follow-unfollow-btn">Follow</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBaseInfo;
