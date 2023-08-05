"use client"
import axios from "axios"
import {useState} from 'react'
import { Button } from "@/components/ui/button";


function Page() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const onSubmitHandler = async(e : React.FormEvent<HTMLFormElement> )=>{
      e.preventDefault()
      const response = await axios.post(`http://localhost:4000/auth/signup`,{
        username,password
      })
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8  "  >
    <h2>Register Form</h2>
    <input required autoFocus={true} type="text" placeholder="Enter username" onChange={e=>setUsername(e.target.value)} />
    <input required type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} />
    <Button>Register</Button>
  </form>
  )
}

export default Page