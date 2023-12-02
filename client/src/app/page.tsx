"use client";
import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { baseUrl } from "@/lib/utils";

function Home() {
  const [collegesArray, setCollegesArray] = useState([]);

  const fetchColleges = async () => {
    try {
      const response = await fetch(`${baseUrl}/college`);
      const data = await response.json();
      setCollegesArray(data.colleges);
    } catch (error) {}
  };



  useEffect(() => {
    fetchColleges();
  });

 

  return (
    <Fragment>
 <div className="w-4/5 mx-auto">
        <h2 className="text-2xl text-center">
          List of Colleges associated with us
        </h2>
        <div className="p-4 md:grid md:grid-cols-5 gap-4 sm:flex sm:flex-col">
          {collegesArray.map((e, i) => {
            return (
              <Link href={`/colleges/${e}`} key={i}>
                <div className="p-4 sm:p-2 border-gray-100 text-center border-2">
                  {e}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
export default Home;
