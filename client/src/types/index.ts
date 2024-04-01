import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type AuthId = {
  username: string;
  _id: number;
  dp: string | StaticImport;
};

export type UserType = {
  username : string
  _id: string;
  authId: AuthId;
  followers: string[];
  following: string[];
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  college: string;
  collegeCity: string;
  collegeLocation: string;
  imageUrl: string;
};


export type notificationInfo = {
  read : boolean
  receipient : string
  sender : {
    _id : string
    username : string
    dp : string
  }
  type : string
  _id : string
  createdAt : string
}