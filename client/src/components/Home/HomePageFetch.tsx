"use client";
import { useConnectContext } from "@/context/context";
import { useEffect, useState,Fragment } from "react";
import SearchResults from "./SearchResults";
import Link from "next/link";
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
    const response = await fetch(`http://localhost:4000/college`);
    const data = await response.json();
    setCollegesArray(data.colleges);
  };
  useEffect(() => {
    fetchColleges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
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
                <Link href={`/colleges/${e}`}>
                <div className="p-4 border-gray-100 text-center border-2" key={i}>{e}</div>
                </Link>
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
