import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Button variant="link">Button</Button>
    </div>
  );
}
