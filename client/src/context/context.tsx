"use client";
import { createContext, useContext, useState } from "react";

export type ConnectContextProviderProps = {
  children: React.ReactNode;
};

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
