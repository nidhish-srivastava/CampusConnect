"use client";
import { useEffect, useState } from "react";

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

function FetchUsers() {
  const [collegesArray, setCollegesArray] = useState([]);

  const fetchColleges = async () => {
    const response = await fetch(`http://localhost:4000/college`);
    const data = await response.json();
    setCollegesArray(data.colleges);
  };
  useEffect(() => {
    fetchColleges();
  }, []);
  return (
    <div>
      <h2 className="text-2xl text-center">List of Colleges associated with us</h2>
      {
        collegesArray.map((e)=>{
          return(
            <>
            <h2>{e}</h2>
            </>
          )
        })
      }
      {/* {searchResultArray?.length ?? 0 > 1 ? (
        <FetchUserCard />
        ) : (
          <>
          <h2 className="text-center text-xl">Hello {user}</h2>
        </>
      )} */}
    </div>
  );
}
export default FetchUsers;
