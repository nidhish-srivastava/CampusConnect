import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { AuthId } from "@/types";
import { baseUrl } from "@/utils";

async function CollegeName({ params }: { params: { college: string } }) {
  const collegeName = params.college;
  try {
    const response = await fetch(
      `${baseUrl}/user/college-students/${collegeName}`,
      { cache: "no-cache" }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: AuthId[] = await response.json();
    const parseCollegeName = (name: string) => name.split("%20").join(" ");
    return (
      <>
        <h2 className="text-center text-xl">
          List of {parseCollegeName(collegeName)} students
        </h2>
        <div className="w-1/2 mx-auto my-8">
          {data?.map((e, i) => (
            <Link href={`/${e?.username}`} key={i}>
              <div className="p-4 mb-2 border-2 bg-transparent flex gap-8 items-center">
                <Avatar>
                  <AvatarImage src={e?.dp as string} alt="@shadcn" />
                  <AvatarFallback>{e?.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="cursor-pointer">{e?.username}</h2>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return <div>Error fetching data</div>;
  }
}

export default CollegeName;
