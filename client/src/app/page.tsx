import FetchUsers from "@/components/FetchUsers";
export default function Home() {
  
  //* NEW THING EXPLORED,if i make the component async and put a loading file in the directory,it automatically shows the loading state
  //* No need to use Suspense with fallback as loading state or using next-dynamic(mixture of lazy loading with Suspense)
  return (
    <FetchUsers/>
  );
}
