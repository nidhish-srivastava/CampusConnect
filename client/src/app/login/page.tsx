"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input"
import { url } from "../page";


function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${url}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Logged In Successfully");

      window.location.href = "/";
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
