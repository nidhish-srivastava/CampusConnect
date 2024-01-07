"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/utils";


function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
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
      }
      if(response.status==200){
        localStorage.setItem("token", data.token);
        alert("Logged In Successfully");
        window.location.href = "/";
      }
    } catch (error: any) {
      alert(error.response.data.message);
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
      <Button className="center_button_form">Login</Button>
    </form>
  );
}

export default Page;
