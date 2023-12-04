import Link from "next/link";
import { baseUrl } from "@/utils";

type collegesObj = {
  _id : string
  colleges : string[]
}

async function Colleges() {
    
    const response = await fetch(`${baseUrl}/college`,{cache : "no-cache"})
    const data : collegesObj = await response.json()
 

  return (
    <>
 <div className="w-4/5 mx-auto">
        <h2 className="text-2xl text-center">
          List of Colleges associated with us
        </h2>
        <div className="p-4 md:grid md:grid-cols-5 gap-4 sm:flex sm:flex-col">
          {data?.colleges.map((e, i) => {
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
    </>
  );
}
export default Colleges;
