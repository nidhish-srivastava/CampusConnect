"use client"
import {useState} from 'react'
import { useConnectContext } from '../../../context/context'
import { Button } from '@/components/ui/button'

function page() {

  const {userProfileObject,user,userDocumentId} = useConnectContext()
  const [followers,setFollowers] = useState([])


  const getFollowers = async () =>{
      const response = await fetch(`http://localhost:4000/user/followers/${userDocumentId}`)
      const data = await response.json()
      console.log(data);
      setFollowers(data)
  }

  const getFollowing = () =>{

  }
  

  return (
    <div>
      <h2>{user}</h2>
      <Button className='text-sm' onClick={getFollowers} >Followers : {userProfileObject?.followers?.length}</Button>
      <h2 onClick={getFollowing}>Following : {userProfileObject?.following?.length}</h2>
      {followers.map((e:any)=>{
        return (
          <h2 className='text-sm'>
             {e?.authId?.username}
          </h2>
        )
      })}
    </div>
  )
}

export default page