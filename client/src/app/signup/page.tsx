"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { base64 } from "@/components/assets/base64";
import { url } from "../page";


function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (confirmPassword === password) {
        const response = await axios.post(`http://localhost:4000/auth/signup`, {
          username,
          password,
          dp : base64
        });
        localStorage.setItem("token", response.data.token);
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
