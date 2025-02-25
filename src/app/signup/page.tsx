"use client";
import { Suspense, lazy, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/utils";
import { Toaster, toast } from "sonner";

const Authanimation = lazy(() => import("@/components/ui/authanimation"));

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (confirmPassword !== password) {
        setLoading(false);
        toast.error("Passwords do not match");
        return;
      }

      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 403) {
        setLoading(false);
        toast.error("Username taken");
        return;
      }

      if (response.status === 200) {
        setRedirectPath(`/${username}`); // Trigger redirect via useEffect
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error while creating account");
    }
  };

  useEffect(() => {
    if (redirectPath) {
      window.location.href = redirectPath; // Client-side redirect only
    }
  }, [redirectPath]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <main className="flex flex-col sm:flex-row items-center justify-center sm:items-start mt-12 gap-12 sm:gap-0 py-12">
        <Suspense>
          <div className="w-[40%] sm:p-0 lg:p-24 lg:pt-0 -z-10">
            <Authanimation />
          </div>
        </Suspense>

        <form onSubmit={onSubmitHandler} className="form w-4/5 mx-auto sm:w-[40%]">
          <h2 className="center_heading_form">Create an account</h2>
          <Input
            required
            autoFocus
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
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-4/5 block mx-auto"
          />
          <Button disabled={loading} className={`${loading ? "opacity-90" : ""} center_button_form`}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </main>
    </>
  );
}

export default Page;
