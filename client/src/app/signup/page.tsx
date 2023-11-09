"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/lib/utils";


function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        const data = await response.json()
        localStorage.setItem("token", data.token);
        alert("Account created");
        window.location.href = "/"  // causing the window reload
      } else alert("Password not matching");
    } catch (error : any) {
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
      <Button className="center_button_form">Register</Button>
    </form>
  );
}

export default Page;
