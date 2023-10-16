import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { UserType } from "@/types";

const ProfileInformation = ({ profileObject }: { profileObject: UserType | undefined }) => {
  return (
    <Fragment>
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
