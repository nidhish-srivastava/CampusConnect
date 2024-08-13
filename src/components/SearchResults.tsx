import { AuthId } from "@/types";
import Link from "next/link";
import UserSearchResultCard from "./UserSearchResultCard";

type props = {
  searchResultArray: AuthId[];
  closeModal: () => void;
};

function SearchResults({ searchResultArray, closeModal }: props) {
  return (
    <>
      <div className="absolute w-[85%] mx-auto my-12">
        {searchResultArray?.map((e, i) => {
          return (
            <Link href={`/${e.username}`} key={i}>
              <div onClick={closeModal}>
                <UserSearchResultCard e={e} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default SearchResults;
