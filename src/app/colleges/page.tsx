import Link from "next/link";
import { baseUrl } from "@/utils";
import { collegesObj } from "@/types";
import { CarouselComponent } from "@/components/Carousel";

async function Colleges() {
  try {
    const response = await fetch(`${baseUrl}/college`, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: collegesObj = await response.json();
    return (
      <div className="container mx-auto">
        <h2 className="text-xl font-medium text-center mb-6">
          List of Colleges associated with us
        </h2>
        <div className="my-4">
          <CarouselComponent />
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-12">
          {data?.colleges.map((e, i) => {
            return (
              <Link href={`/colleges/${e}`} key={i}>
                <div className="p-4 sm:p-2 border border-gray-100 bg-green-500 text-white hover:bg-green-600 text-center rounded-lg shadow-sm">
                  {e}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return <div>Error fetching data</div>;
  }
}

export default Colleges;
