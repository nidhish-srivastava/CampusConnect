"use client"
import {useEffect,useState} from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { Montserrat } from 'next/font/google';

const fontMontserrat = Montserrat({subsets : ["latin"]})
import { useConnectContext } from '../../context/context';

function Navbar() {
  const {user,userId,setUser,setUserId,setUserDocumentId,setUserProfileObject} = useConnectContext()
  const [trigger,setTrigger] = useState(false)

  //* Using jwt authorization for accessing content after authentication from login/signup
  const check = async () =>{
    const response = await fetch(`http://localhost:4000/auth/me`,{
      method : "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    const data = await response.json();
    setUser(data.username)
    setUserId(data.id)
    setTrigger(e=>!e)
  }
  const FetchLoggedInUser =  async()=>{
    const response =  await fetch(`http://localhost:4000/user/${userId}`)
    const data = await response.json()
    setUserProfileObject(data)
     setUserDocumentId(data._id)
     console.log(data);
   }
  useEffect(()=>{
    check()
  },[])

  //* If we dont pass any dependency,and try using setTimeout,it wont work,do triggering and pass that as dependency
  useEffect(()=>{
  FetchLoggedInUser()
  },[trigger])


  return (
    <div className={`p-6 flex items-center justify-end gap-6 ${fontMontserrat.className}`}>
      { user?.length > 1  ? (
        <>
        <Button>
          <Link href={`/`}>
          Home
          </Link>
        </Button>
        <Button>
          <Link href={`/profile`}>
          Profile
          </Link>
        </Button>
        <Button onClick={()=>{
          localStorage.setItem("token","")
          window.location.href = "/"
        }}>
          Logout
        </Button>
        </>
      ):(
        <>
      <Button>
      <Link href={`/signup`}>SignUp</Link>
      </Button>
      <Button>
        <Link href={`/login`} >Login</Link>
      </Button>
        
        </>
      )}
    </div>
  )
}

export default Navbar