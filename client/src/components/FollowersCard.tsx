
type Props = {
    followers : {
        authId : {
            _id : string
            username : string
        }
        _id : string
    }[],
}

function FollowersCard({followers} : Props) {
  
  return (
    <div>
        { followers.map((e: any) => {
          return <h2 className="text-sm">{e?.authId?.username}</h2>;
        })}
      
    </div>
  )
}

export default FollowersCard