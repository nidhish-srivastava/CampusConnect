"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/utils";


function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
      try {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          username : username,password : password
        })
      });
      const data = await response.json()
      if(response.status==403){
        alert(data.message)
        setLoading(false)
        return
      }
      if(response.status==401){
        alert(data.message)
        setLoading(false)
        return
      }
      if(response.status==200){
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    } catch (error: Error | any) {
      setLoading(false)
      alert("Error")
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="form"
    >
      <h2 className="center_heading_form">Login Form</h2>
      <Input
        required
        autoFocus={true}
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        required
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={loading} className={`${loading ? "opacity-90" : ""}  center_button_form`}>Login</Button>
    </form>
  );
}

export default Page;
