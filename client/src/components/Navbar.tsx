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
    setUser,
    setUserId,
    setSearchResultArray,
    imageUrl,setImageUrl
  } = useConnectContext();
  const [query,setQuery] = useState("")
  // const [imageUrl,setImageUrl] = useState("")

  //* Using jwt authorization for accessing content after authentication from login/signup
  const check = async () => {
    const response = await fetch(`http://localhost:4000/auth/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log("run");
    const data = await response.json();
    setUser(data.username);
    setUserId(data.id);
    setImageUrl(data.dp)
  };

  const getUsername = async() =>{
       const response = await fetch(`http://localhost:4000/user?username=${query}`)
       const data = await response.json()
      //  console.log(data);
       setSearchResultArray(data)
  }

  useEffect(() => {
    check();
  }, []);



  useEffect(()=>{
    let id = setTimeout(()=>{
      if(query.length>1){
        getUsername()
      }
      if(query.length==0) setSearchResultArray(null)  //* For removing the search result once we remove the input
    },1000)
    return () => clearInterval(id)
  },[query])

  


  return (
    <>
    <div
      className={`p-6 flex items-center justify-end gap-6 ${fontMontserrat.className}`}
      >
    <Input type="search"
    value={query}
    onChange={e=>setQuery(e.target.value)}
    placeholder="Search user..." className="w-[30%] mr-auto text-[1.03rem] border-teal-400" />
            <Link href="/">
          <Button className="text-[1.1rem] px-6">
              Home
          </Button>
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
          <Button>
              SignUp
          </Button>
              </Link>
            <Link href={`/login`}>
          <Button>
              Login
          </Button>
              </Link>
        </>
      )}
    </div>
      </>
  );
}

export default Navbar;
