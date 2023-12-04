import { AuthId } from "@/types"
import { Avatar,AvatarImage,AvatarFallback } from "@radix-ui/react-avatar"

type props = {
    e : AuthId
}

function UserSearchResultCard({e}:props) {
  return (
    <>
      <div
            className="p-4 mb-2 border-2 bg-transparent flex gap-8 items-center"
          >
            <Avatar>
              <AvatarImage width={60} height={60} src={e?.dp as string} alt="@shadcn" />
              <AvatarFallback>{e.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2
              className="cursor-pointer"
              >
              {e.username}
            </h2>
          </div>
    </>
  )
}

export default UserSearchResultCard