"use client";
import { useConnectContext } from "@/context/context";
import { useEffect, useState,Fragment } from "react";
import SearchResults from "./SearchResults";
import { url } from "@/app/page";
type AuthId = {
  username: string;
  _id: number;
};

export type UserType = {
  _id: string;
  authId: AuthId;
  followers: string[];
  following: string[];
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  college: string;
  collegeCity: string;
  collegeLocation: string;
  imageUrl: string;
};

function HomePageFetch() {
  const [collegesArray, setCollegesArray] = useState([]);
  const {searchResultArray} = useConnectContext()

  const fetchColleges = async () => {
    const response = await fetch(`${url}/college`);
    const data = await response.json();
    setCollegesArray(data.colleges);
  };
  useEffect(() => {
    fetchColleges();
  }, []);
  return (
    <Fragment>
      {searchResultArray?.length ?? 0 > 1 ? (
        <SearchResults />
        ) : (
          <div className="w-4/5 mx-auto mt-10">
          <h2 className="text-2xl text-center">List of Colleges associated with us</h2>
          <div className="p-4 grid grid-cols-5 gap-4 ">
          {
            collegesArray.map((e,i)=>{
              return(
                <div className="p-4 border-gray-100 text-center border-2" key={i}>{e}</div>
                )
              })
            }
            </div>
        </div>
      )}
    </Fragment>
  );
}
export default HomePageFetch;
