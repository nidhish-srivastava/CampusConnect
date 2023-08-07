"use client";
import { createContext, useContext, useState } from "react";
import { UserType } from "@/components/FetchUsers";

type ConnectContextProviderProps = {
  children: React.ReactNode;
};

type ConnectContextTypes = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  userDocumentId : string
  setUserDocumentId: React.Dispatch<React.SetStateAction<string>>;
  userProfileObject : UserType | null
  setUserProfileObject : React.Dispatch<React.SetStateAction<UserType | null>>;
  trigger : boolean
  setTrigger : React.Dispatch<React.SetStateAction<boolean>>
};

const ConnectContext = createContext({} as ConnectContextTypes);

export const useConnectContext = () => useContext(ConnectContext);

export const ConnectContextProvider = ({
  children,
}: ConnectContextProviderProps) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(0);
  const [userDocumentId,setUserDocumentId] = useState("") 
  const [userProfileObject,setUserProfileObject] = useState<UserType | null>(null) 
  const [trigger,setTrigger] = useState(false)

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
        trigger,
        setTrigger
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
