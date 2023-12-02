import { AuthId } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

 function SearchResults({searchResultArray} : {searchResultArray : AuthId[]}) {

  return (
    <div className="absolute w-[85%] mx-auto my-8">
      {searchResultArray?.map((e, i) => {
        return (
          <Link href={`/${e.username}`}
          key={i}
          >
          <div
            className="p-4 mb-2 border-2 bg-transparent flex gap-8 items-center"
          >
            <Avatar>
              <AvatarImage src={e?.dp as string} alt="@shadcn" />
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
