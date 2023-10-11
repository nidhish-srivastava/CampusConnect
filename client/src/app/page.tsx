"use client";
import { AuthId } from "@/types";
import { useEffect, useState, Fragment } from "react";
import SearchResults from "@/components/SearchResults";
import Link from "next/link";
import { Input } from "@/components/ui/input";

function Home() {
  const [query, setQuery] = useState("");
  const [collegesArray, setCollegesArray] = useState([]);
  const [searchResultArray, setSearchResultArray] = useState<AuthId[]>([]);

  const fetchColleges = async () => {
    try {
      const response = await fetch(`http://localhost:4000/college`);
      const data = await response.json();
      setCollegesArray(data.colleges);
    } catch (error) {}
  };

  const getUsername = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user?username=${query}`
      );
      const data = await response.json();
      console.log(data);
      setSearchResultArray(data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    let id = setTimeout(() => {
      if (query.length > 1) {
        getUsername();
      }
      if (query.length == 0) setSearchResultArray([]); //* For removing the search result once we remove the input
    }, 1000);
    return () => clearInterval(id);
  }, [query]);

  return (
    <Fragment>
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search user..."
        className="w-[30%] ml-[4rem] text-[1.03rem] border-teal-400"
      />
      {searchResultArray?.length ?? 0 > 1 ? (
        <SearchResults searchResultArray={searchResultArray} />
      ) : (
        <div className="w-4/5 mx-auto mt-10">
          <h2 className="text-2xl text-center">
            List of Colleges associated with us
          </h2>
          <div className="p-4 grid grid-cols-5 gap-4 ">
            {collegesArray.map((e, i) => {
              return (
                <Link href={`/colleges/${e}`}>
                  <div
                    className="p-4 border-gray-100 text-center border-2"
                    key={i}
                  >
                    {e}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default Home;
