"use client";
import { useConnectContext } from "@/context/context";
import { useEffect, useState,Fragment } from "react";
import SearchResults from "./SearchResults";

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
  const {searchResultArray,user} = useConnectContext()

  const fetchColleges = async () => {
    const response = await fetch(`http://localhost:4000/college`);
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
          {/* <h2 className="text-center text-xl">Hello {user}</h2> */}
          <h2 className="text-2xl text-center">List of Colleges associated with us</h2>
          {
            collegesArray.map((e,i)=>{
              return(
                <div className="p-4" key={i}>
                <li>{e}</li>
                </div>
              )
            })
          }
        </div>
      )}
    </Fragment>
  );
}
export default HomePageFetch;
