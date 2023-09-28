"use client";
import { createContext, useContext, useState } from "react";

type AuthId = {
  username: string;
  _id: number;
  dp : string
};

export type UserType = {
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
type ConnectContextProviderProps = {
  children: React.ReactNode;
};

export type SearchResult = {
  username : string
  _id : string
  dp : string
}

export type FollowersFollowingType = {
  authId : {
    _id : string
    username : string
}
_id : string
}

type ConnectContextTypes = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  userDocumentId : string
  setUserDocumentId: React.Dispatch<React.SetStateAction<string>>;
  changeBtn : boolean
  setChangeBtn : React.Dispatch<React.SetStateAction<boolean>>
  imageUrl : string
  setImageUrl : React.Dispatch<React.SetStateAction<string>>
};

const ConnectContext = createContext({} as ConnectContextTypes);

export const useConnectContext = () => useContext(ConnectContext);

export const ConnectContextProvider = ({
  children,
}: ConnectContextProviderProps) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(0);
  const [imageUrl,setImageUrl] = useState("")
  const [userDocumentId,setUserDocumentId] = useState("") 
  const [changeBtn,setChangeBtn] = useState(false)

  return (
    <ConnectContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
        userDocumentId,
        setUserDocumentId,
        changeBtn,setChangeBtn,
        imageUrl,setImageUrl
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
