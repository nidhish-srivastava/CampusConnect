"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword === password) {
      const response = await axios.post(`http://localhost:4000/auth/signup`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      // window.location.href = "/signin"  // causing the window to relaod
      window.location.href = "/"
      alert("Account created");
    } else alert("Password not matching");
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8  "
    >
      <h2>Register Form</h2>
      <input
        required
        autoFocus={true}
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        required
        type="password"
        placeholder="re-enter password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button>Register</Button>
    </form>
  );
}

export default Page;
