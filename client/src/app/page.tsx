import HomePageFetch from "@/components/Home/HomePageFetch";
import { Fragment } from "react";
// export const url = "https://campus-connect-one.vercel.app"
export const url = "https://localhost:4000"

export default function Home() {
  return (
    <Fragment>
    <HomePageFetch/>
    </Fragment>
  );
}
