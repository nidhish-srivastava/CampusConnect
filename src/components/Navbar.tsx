"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConnectContext } from "../context/context";
import { PROJECT_NAME, baseUrl, debounce } from "@/utils";
import { Search } from "lucide-react";
import SearchBarModal from "./SearchBarModal";
import { Input } from "./ui/input";
import SearchResults from "./SearchResults";
import { AuthId } from "@/types";
import Image from "next/image";
// import Notification from "./icons/notification";

function Navbar() {
  const { user, setUser, setUserId, imageUrl, setImageUrl, setUserDocumentId } =
    useConnectContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [searchResultArray, setSearchResultArray] = useState<AuthId[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const findUserDocumentPromise = async (username: string): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/user/${username}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  };

  const getUsername = async () => {
    try {
      // const response = await fetch(`${baseUrl}/user?username=${query}`);
      const response = await fetch(`${baseUrl}/user/search/${query}`);
      const data = await response.json();
      setSearchResultArray(data?.fetchUser);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const checkIfAuthenticated = async (): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      try {
        const authCheck = await checkIfAuthenticated();
        if (authCheck != undefined) {
          const findUserDocument = await findUserDocumentPromise(
            authCheck?.username
          );
          setUser(authCheck?.username);
          setUserId(authCheck?.id);
          setImageUrl(authCheck?.dp);
          setUserDocumentId(findUserDocument?.id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    let id = debounce(query, getUsername, setSearchResultArray);
    return () => clearInterval(id);
  }, [query]);

  const navigateToSearchRoute = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push(`/search/${query}`);
      closeModal();
    }
  };
  const pathArray = pathname.split("/");
  const pathCheck = pathArray[pathArray.length - 2];

  if (loading)
    return (
      <>
        <div className="p-6 flex customsm:justify-center items-center justify-end gap-6">
          <Link
            href="/"
            className="logo customsm:hidden font-semibold mr-auto text-2xl"
          >
            <span className="part1">CAMPUS</span>
            <span className="part2">CONNECT</span>
          </Link>
          <Avatar>
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback>{user?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </>
    );

  return (
    <>
      <div className="p-6 flex customsm:justify-center items-center justify-end gap-6">
        <Link
          href="/"
          className="logo customsm:hidden font-semibold mr-auto text-2xl"
        >
          <span className="part1">CAMPUS</span>
          <span className="part2">CONNECT</span>
        </Link>

        {pathCheck != "search" && !isModalOpen ? (
          <span onClick={openModal}>
            <Search />
          </span>
        ) : null}
        <SearchBarModal isOpen={isModalOpen} onClose={closeModal}>
          <Input
            type="search"
            value={query}
            autoFocus={true}
            onKeyDown={navigateToSearchRoute}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search user..."
            className="mx-auto w-[100%] text-[1.03rem] border-teal-400"
          />
          {searchResultArray.length > 0 && (
            <SearchResults
              closeModal={closeModal}
              searchResultArray={searchResultArray}
            />
          )}
          <div className="p-2 text-center" onClick={closeModal}>
            {searchResultArray.length > 1 && (
              <Link href={`/search/${query}`} className="text-blue-700 text-xl">
                Show All Results
              </Link>
            )}
            {searchResultArray.length === 0 &&
              query.length > 1 &&
              "No results found"}
          </div>
        </SearchBarModal>

        {user?.length > 1 ? (
          <>
            {/* <Link href={`/notification`}>
              <Notification />
            </Link> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={imageUrl} alt="@shadcn" />
                  <AvatarFallback>{user?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Hi {user}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/${user}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={logoutHandler}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href={`/signup`}>
              <Button className="bg-blue-700">SignUp</Button>
            </Link>
            <Link href={`/login`}>
              <Button className="bg-blue-700">Login</Button>
            </Link>
          </>
        )}
      </div>
      <div className="text-center">
        <Link
          href="/"
          className="hidden customsm:block customsm:mb-[3rem]  font-semibold text-[2rem]"
        >
          {PROJECT_NAME}
        </Link>
      </div>
    </>
  );
}

export default Navbar;
