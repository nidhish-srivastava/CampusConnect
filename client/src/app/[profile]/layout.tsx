import Profile from "@/components/MyProfile/ProfileDetails";
import { Suspense } from "react";
import Loading from "./loading";
import ProfileBaseInfo from "@/components/MyProfile/ProfileBaseInfo";

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
