"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fontMontserrat = Montserrat({ subsets: ["latin"] });
import { useConnectContext } from "../context/context";

function Navbar() {
  const {
    user,
    userId,
    setUser,
    setUserId,
    setUserDocumentId,
    setUserProfileObject,
    trigger,
  } = useConnectContext();
  const [change, setChange] = useState(false);

  //* Using jwt authorization for accessing content after authentication from login/signup
  const check = async () => {
    const response = await fetch(`http://localhost:4000/auth/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setUser(data.username);
    setUserId(data.id);
    setChange((e) => !e); //* For triggering the loggedIn User function after we fetch the user profile route(it can be optimised though)
  };
  const FetchLoggedInUser = async () => {
    const response = await fetch(`http://localhost:4000/user/${userId}`);
    const data = await response.json();
    setUserProfileObject(data);
    setUserDocumentId(data._id);
    console.log(data);
  };
  useEffect(() => {
    check();
  }, []);

  //* If we dont pass any dependency,and try using setTimeout,it wont work,do triggering and pass that as dependency
  useEffect(() => {
    FetchLoggedInUser();
  }, [change, trigger]);

  return (
    <>
    <div
      className={`p-6 flex items-center justify-end gap-6 ${fontMontserrat.className}`}
      >
    <Input type="search" placeholder="Search user..." className="w-[30%] mr-auto text-[1.03rem] border-teal-400" />
      {user?.length > 1 ? (
        <>
          <Button className="text-[1.1rem] px-6">
            <Link href="/">Home</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/create-profile">
                Profile
                </Link>
                </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  localStorage.setItem("token", "");
                  window.location.href = "/";
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button>
            <Link href={`/signup`}>SignUp</Link>
          </Button>
          <Button>
            <Link href={`/login`}>Login</Link>
          </Button>
        </>
      )}
    </div>
      </>
  );
}

export default Navbar;
