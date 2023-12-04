"use client";
import { useEffect,useState} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
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

const fontMontserrat = Montserrat({ subsets: ["latin"] });
import { useConnectContext } from "../context/context";
import { AuthId } from "@/types";
import { PROJECT_NAME,baseUrl,debounce } from "@/utils";
import { Search } from "lucide-react";
import SearchBarModal from "./SearchBarModal";
import { Input } from "./ui/input";
import SearchResults from "./SearchResults";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [searchResultArray, setSearchResultArray] = useState<AuthId[]>([]);
  const [query, setQuery] = useState("");
  const pathname = usePathname()


  const findUserDocumentPromise = async (username: string): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/user/${username}`);
      return await response.json();
    } catch (error) {
      
    }
  };
  
  const navigateToSearchRoute = (e : React.KeyboardEvent) =>{
    if(e.key=="Enter"){
      router.push(`/search/${query}`)
      closeModal()
    }
  }

  const getUsername = async () => {
    try {
      const response = await fetch(`${baseUrl}/user?username=${query}`);
      const data = await response.json();
      // console.log(data);
      setSearchResultArray(data);
    } catch (error) {}
  };

  const authenticateUserPromise = async (): Promise<any> => {
    try {
      const response = await fetch(`${baseUrl}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return await response.json();
    } catch (error) {
      
    }
  };

  //* Using jwt authorization for accessing content after authentication from login/signup
  const check = async () => {
    const authenticateUser = await authenticateUserPromise();
    const findUserDocument = await findUserDocumentPromise(
      authenticateUser?.username
    );
    await Promise.all([authenticateUser, findUserDocument]);
    setUser(authenticateUser?.username);
    setUserId(authenticateUser?.id);
    setUserDocumentId(findUserDocument?._id);
    setImageUrl(authenticateUser?.dp);
  };

  useEffect(() => {
    check();
  });


  useEffect(() => {
    let id = debounce(query,getUsername,setSearchResultArray)
    return () => clearInterval(id);
  }, [query]);

  const pathArray =   pathname.split("/")
  const pathCheck = pathArray[pathArray.length-2]
  // console.log(pathCheck);
  

  return (
    <>
      <div
        className={`p-6 flex items-center justify-end gap-6 ${fontMontserrat.className}`}
      >
        <Link href="/" className="mr-auto text-[1.4rem]">
          {PROJECT_NAME}
            </Link>
          {
            (pathCheck!="search" && !isModalOpen) ? 
          <span onClick={openModal}>
        <Search />
      </span>
        : null
      }
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
        {searchResultArray?.length ?? 0 > 1 ? (
          <SearchResults closeModal={closeModal} searchResultArray={searchResultArray} />
        ) : null}
           <div className="p-2 text-center" onClick={closeModal}>
    <Link href={`/search/${query}`} className=" text-blue-700 text-xl">Show All Results</Link>
    </div>
      </SearchBarModal>
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
              <Button className="bg-blue-700">SignUp</Button>
            </Link>
            <Link href={`/login`}>
              <Button className="bg-blue-700">Login</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
