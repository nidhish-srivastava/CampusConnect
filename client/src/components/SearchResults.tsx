import { SearchResult, useConnectContext } from "@/context/context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

 function SearchResults({searchResultArray} : {searchResultArray : SearchResult[]}) {

  return (
    <div className="w-1/2 mx-auto my-8">
      {searchResultArray?.map((e, i) => {
        return (
          <Link href={`/${e.username}`}>
          <div
            className="p-4 mb-2 border-2 bg-transparent flex gap-8 items-center"
            key={i}
          >
            <Avatar>
              <AvatarImage src={e.dp} alt="@shadcn" />
              <AvatarFallback>{e.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2
              className="cursor-pointer"
            >
              {e.username}
            </h2>
          </div>
            </Link>
        );
      })}
    </div>
  );
}

export default SearchResults;
