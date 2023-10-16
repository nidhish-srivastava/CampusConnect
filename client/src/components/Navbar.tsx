"use client";
import { useEffect} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { baseUrl } from "@/lib/utils";

function Navbar() {
  const {
    user,
    setUser,
    setUserId,
    imageUrl,
    userDocumentId,
    setImageUrl,
    setUserDocumentId,
  } = useConnectContext();

  const findUserDocumentPromise = async (username: string): Promise<any> => {
    const response = await fetch(`${baseUrl}/user/${username}`);
    return await response.json();
  };

  const authenticateUserPromise = async (): Promise<any> => {
    const response = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return await response.json();
  };

  //* Using jwt authorization for accessing content after authentication from login/signup
  const check = async () => {
    const authenticateUser = await authenticateUserPromise();
    const findUserDocument = await findUserDocumentPromise(
      authenticateUser.username
    );
    await Promise.all([authenticateUser, findUserDocument]);
    setUser(authenticateUser.username);
    setUserId(authenticateUser.id);
    setUserDocumentId(findUserDocument._id);
    setImageUrl(authenticateUser.dp);
  };

  useEffect(() => {
    check();
    console.log(userDocumentId);
  }, []);

  return (
    <>
      <div
        className={`p-6 flex items-center justify-end gap-6 ${fontMontserrat.className}`}
      >
        <Link href="/">
          <Button className="text-[1.1rem] px-6">Home</Button>
        </Link>
        {user?.length > 1 ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={imageUrl} alt="@shadcn" />
                  <AvatarFallback>{user.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/${user}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer"
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
            <Link href={`/signup`}>
              <Button>SignUp</Button>
            </Link>
            <Link href={`/login`}>
              <Button>Login</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
