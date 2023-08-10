
type Props = {
    following : {
        authId : {
            _id : string
            username : string
        }
        _id : string
    }[],
}

function FollowingCard({following} : Props) {
  return (
    <div>
  {  following.map((e: any) => {
          return <h2 className="text-sm">{e?.authId?.username}</h2>;
        })}
    </div>
  )
}

export default FollowingCard