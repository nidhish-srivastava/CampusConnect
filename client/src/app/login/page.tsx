"use client"
import axios from "axios"
import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'

function Page() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [token, setToken] = useState<string | undefined>('');


  const onSubmitHandler = async(e : React.FormEvent<HTMLFormElement> )=>{
      e.preventDefault()
      const response = await axios.post(`http://localhost:4000/auth/login`,{
        username,password
      })
      localStorage.setItem("token",response.data.token)
      alert("Logged In Successfully")
      window.location.href = "/"  
  }

  useEffect(() => {
    // When the component mounts, fetch the token from the cookie
    const tokenFromCookie = Cookies.get('token');
    setToken(tokenFromCookie);
    console.log(token);
  }, []);


  return (
    <form onSubmit={onSubmitHandler} >
      <h2>Login Form</h2>
      <input required autoFocus={true} type="text" placeholder="Enter username" onChange={e=>setUsername(e.target.value)} />
      <input required type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  )
}

export default Page