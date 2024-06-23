"use client";
import { Suspense, lazy, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/utils";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster, toast } from "sonner";
const Authanimation = lazy(()=>import("@/components/ui/Authanimation"))

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
        if(response.status==403){
          setLoading(false)
          toast.error("Username taken")
        }
        if(response.status==200){
          const data = await response.json()
          localStorage.setItem("token", data.token);
          window.location.href = "/"  // causing the window reload
        }
      } else{
        setLoading(false)
        toast.error("Password not matching");
      } 
    } catch (error : Error | any) {
      toast.error("Error while creating account")
    }
  };
  return (
    <ProtectedRoute>
      <Toaster richColors position="top-center" />
      <main className="flex flex-col sm:flex-row items-center justify-center sm:items-start mt-12  gap-12 sm:gap-0 py-12">
        <Suspense>
      <div className="w-[40%] sm:p-0 lg:p-24 lg:pt-0 -z-10">
          <Authanimation />
        </div>
        </Suspense>
    <form
      onSubmit={onSubmitHandler}
      className="form w-4/5 mx-auto sm:w-[40%]"
    >
            <h2 className="center_heading_form">Create an account</h2>
      <Input
        required
        autoFocus={true}
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-4/5 block mx-auto"
      />
      <Input
        required
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-4/5 block mx-auto"
      />
      <Input
        required
        type="password"
        placeholder="re-enter password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-4/5 block mx-auto"
      />
      <Button disabled={loading} className={`${loading ? "opacity-90": ""} center_button_form`}>Register</Button>
    </form>
</main>
    </ProtectedRoute>

  );
}

export default Page;
