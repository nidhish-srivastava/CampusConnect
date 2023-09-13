"use client";
import { createContext, useContext, useState } from "react";
import { UserType } from "@/components/Home/HomePageFetch";

type ConnectContextProviderProps = {
  children: React.ReactNode;
};

type SearchResult = {
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
  userProfileObject : UserType | null
  setUserProfileObject : React.Dispatch<React.SetStateAction<UserType | null>>;
  searchedUserProfile : UserType | null
  setSearchUserProfile : React.Dispatch<React.SetStateAction<UserType | null>>;
  searchResultArray : SearchResult[] | null
  setSearchResultArray : React.Dispatch<React.SetStateAction<SearchResult[] | null>>;
  followers : FollowersFollowingType[] | null
  setFollowers : React.Dispatch<React.SetStateAction<FollowersFollowingType[] | null>>
  following : FollowersFollowingType[] | null
  setFollowing : React.Dispatch<React.SetStateAction<FollowersFollowingType[] | null>>
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
  const [userProfileObject,setUserProfileObject] = useState<UserType | null>(null) 
  const [searchResultArray,setSearchResultArray] = useState<SearchResult[] | null>(null)
  const [searchedUserProfile,setSearchUserProfile] = useState<UserType | null>(null)
  const [followers,setFollowers] = useState<FollowersFollowingType[] | null>(null)
  const [following,setFollowing] = useState<FollowersFollowingType[] | null>(null)
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
        userProfileObject,
        setUserProfileObject,
        searchResultArray,
        setSearchResultArray,
        searchedUserProfile,setSearchUserProfile,
        followers,setFollowers,
        following,setFollowing,
        changeBtn,setChangeBtn,
        imageUrl,setImageUrl
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
