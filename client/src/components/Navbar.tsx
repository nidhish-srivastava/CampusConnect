"use client"
import {useEffect,useState} from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button";

function Navbar() {
  const [user,setUser] = useState("")
  const check = async () =>{
    const response = await fetch(`http://localhost:4000/auth/me`,{
      method : "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    const data = await response.json();
    setUser(data.username)
    console.log(data);
  }
  useEffect(()=>{
    check()
  },[])

  return (
    <div className='p-6 flex items-center justify-end gap-6'>
      {user.length>1 && user ? (
        <>
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