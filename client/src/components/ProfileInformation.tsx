import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { UserType } from "@/types";

const ProfileInformation = ({ profileObject }: { profileObject: UserType }) => {
  return (
    <Fragment>
      {/* <div className="flex justify-center gap-8 items-center">
        <Image
          src={profileObject?.authId?.dp}
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <h2 className="text-center text-[20px]">
          {profileObject?.authId?.username}
        </h2>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Link href={`/${profileObject?.authId?.username}/followers`}>
          <Button className="text-[16px]">
            {profileObject?.followers?.length}
            <br />
            Followers{" "}
          </Button>
        </Link>
        <Link href={`/${profileObject?.authId?.username}/following`}>
          <Button className="text-[16px]">
            {profileObject?.following?.length}
            <br />
            Following{" "}
          </Button>
        </Link>
      </div> */}
      <div className="grid grid-cols-2 gap-4 items-center w-4/6 mx-auto my-10">
        {/* <div> */}
        <Button className="profile-btn-label">College</Button>
        <label>{profileObject?.college}</label>
        {/* </div> */}
        {/* <div> */}
        <Button className="profile-btn-label">College City</Button>
        <label>{profileObject?.collegeCity}</label>
        {/* </div> */}
        {/* <div> */}
        <Button className="profile-btn-label">College Location</Button>
        <label>{profileObject?.collegeLocation}</label>
        {/* </div> */}
        <Button className="profile-btn-label">Email</Button>
        <label>{profileObject?.email}</label>
        <Button className="profile-btn-label">Github</Button>
        <a href={profileObject?.github}>{profileObject?.github}</a>
        <Button className="profile-btn-label">LinkedIn</Button>
        <a href={profileObject?.linkedin}>{profileObject?.linkedin}</a>
        <Button className="profile-btn-label">Leetcode</Button>
        <a href={profileObject?.leetcode}>{profileObject?.leetcode}</a>
      </div>
    </Fragment>
  );
};

export default ProfileInformation;
