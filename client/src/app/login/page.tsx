"use client"
import {useState} from 'react'
import { Button } from "@/components/ui/button";
import axios from 'axios'

function Page() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")


  const onSubmitHandler = async(e : React.FormEvent<HTMLFormElement> )=>{
      e.preventDefault()
      const response = await axios.post(`http://localhost:4000/auth/login`,{
        username,
        password
      })
      localStorage.setItem("token", response.data.token);
      alert("Logged In Successfully")
      window.location.href = "/"  
  }

 

  return (
    <form onSubmit={onSubmitHandler}>
      <h2>Login Form</h2>
      <input required autoFocus={true} type="text" placeholder="Enter username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input required type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
      <Button>
        Login
      </Button>
    </form>
  )
}

export default Page