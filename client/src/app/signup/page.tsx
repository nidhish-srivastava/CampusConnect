"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/utils";


function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false)

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (confirmPassword === password) {
        const response = await fetch(`${baseUrl}/auth/signup`, {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            username : username,password : password
          })
        });
        console.log(response);
        
        if(response.status==200){
          const data = await response.json()
          localStorage.setItem("token", data.token);
          alert("Account created");
          window.location.href = "/"  // causing the window reload
        }
        if(response.status==403){
          setLoading(false)
          alert("Username taken")
        }
        
      } else{
        setLoading(false)
        alert("Password not matching");
      } 
    } catch (error : Error | any) {
      alert("Error while creating account")
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="form"
    >
            <h2 className="center_heading_form">Register Form</h2>
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
      <Input
        required
        type="password"
        placeholder="re-enter password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button disabled={loading} className={`${loading ? "opacity-90": ""} center_button_form`}>Register</Button>
    </form>
  );
}

export default Page;
