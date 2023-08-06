"use client";
import { createContext, useContext, useState } from "react";

type ConnectContextProviderProps = {
  children: React.ReactNode;
};

type ConnectContextTypes = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
};

const ConnectContext = createContext({} as ConnectContextTypes);

export const useConnectContext = () => useContext(ConnectContext);

export const ConnectContextProvider = ({
  children,
}: ConnectContextProviderProps) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(0);
  return (
    <ConnectContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
