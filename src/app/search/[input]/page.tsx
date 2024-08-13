"use client";
import { AuthId } from "@/types";
import {  useState } from "react";
import { baseUrl } from "@/utils";
import { useEffect } from "react";
import { debounce } from "@/utils";
import { Input } from "@/components/ui/input";
import UserSearchResultCard from "@/components/UserSearchResultCard";
import { useParams } from "next/navigation";
import Link from "next/link";

function SearchFeature() {
  const params = useParams()
  const [searchResults, setSearchResults] = useState<AuthId[]>([]);
  const [query, setQuery] = useState(params.input);
  const getUsername = async () => {
    try {
      const response = await fetch(`${baseUrl}/user?username=${query}`);
      const data = await response.json();
      setSearchResults(data?.fetchUser);
    } catch (error) {}
  };

  useEffect(() => {
    let id = debounce(query as string, getUsername, setSearchResults);
    return () => clearInterval(id);
  }, [query]);

  return (
    <>
    <div className="mx-auto w-2/5 mb-4">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search user..."
        className="mx-auto w-[100%] text-[1.03rem] border-teal-400"
        />
        </div>
      <main className="w-[75%] mx-auto my-12">
        {searchResults?.map((e,i)=>(
          <Link href={`/${e.username}`} key={i}>
          <UserSearchResultCard e={e}/>
          </Link>
        ))}
      </main>
    </>
  );
}

export default SearchFeature;
