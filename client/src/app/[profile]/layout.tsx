import Profile from "@/components/ProfileDetails";
import { Suspense } from "react";
import Loading from "./loading";
import ProfileBaseInfo from "@/components/ProfileBaseInfo";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <ProfileBaseInfo />
      </Suspense>
      {children}
    </section>
  );
}
