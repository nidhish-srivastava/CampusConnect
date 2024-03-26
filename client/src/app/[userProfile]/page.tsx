"use client";
import { useParams } from "next/navigation";
import { useConnectContext } from "@/context/context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfileBaseInfo from "@/components/ProfileBaseInfo";
import ProfileInformation from "@/components/ProfileInformation";
import { baseUrl } from "@/utils";
import { useEffect, useState } from "react";
import { UserType } from "@/types";
import { defaultDp } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function FetchUser() {
  const { userProfile } = useParams();
  const { user } = useConnectContext();
  const [updatedDp, setUpdatedDp] = useState(defaultDp);
  const [data, setData] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchProfileInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/user/${userProfile}`);
        const data = await response.json();
        setData(data);
        setUpdatedDp(data.authId.dp);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfileInfo();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {data && (
            <ProfileBaseInfo
              updatedDp={updatedDp}
              setUpdatedDp={setUpdatedDp}
              setProfileObject={setData}
              profileObject={data}
            />
          )}
          <>
            {data?.email.length == 0 && data?.username == user ? (
              <div className="text-center mt-6">
                <Link href={`/${data?.username}/create-profile`}>
                  <Button className="text-sm bg-amber-600 px-3">
                    Create your Profile
                  </Button>
                </Link>
              </div>
            ) : null}
          </>
          <>
            {data && data.email.length !== 0 && (
              <ProfileInformation profileObject={data} />
            )}
          </>
        </>
      ) : 
      <div className="flex min-h-full mt-6 gap-5 items-center justify-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[400px]" />
        <Skeleton className="h-8 w-[400px]" />
      </div>
    </div>
      }
    </>
  );
}
