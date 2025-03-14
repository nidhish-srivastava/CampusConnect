"use client";
import { Suspense, lazy, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { baseUrl } from "@/utils";
import { Toaster, toast } from 'sonner';
import dynamic from "next/dynamic";

const Authanimation = dynamic(() => import("@/components/ui/authanimation"), {
  ssr: false,
  loading: () => <div></div>
});

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 403 || response.status === 401) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      if (response.status === 200) {
        setRedirectPath(`/${username}`); // Trigger redirect in useEffect
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error");
    }
  };

  useEffect(() => {
    if (redirectPath) {
      window.location.href = redirectPath; // Client-side redirect
    }
  }, [redirectPath]);

  return (
    <>
      <Toaster richColors position="top-center" />
      <main className="flex flex-col sm:flex-row items-center justify-center sm:items-start mt-12 gap-12 sm:gap-0">
        <div className="w-[40%] sm:p-0 lg:p-24 lg:pt-0 -z-10">
          <Suspense>
            <Authanimation />
          </Suspense>
        </div>
        <form onSubmit={onSubmitHandler} className="form w-4/5 mx-auto sm:w-[40%]">
          <h2 className="center_heading_form">Login</h2>
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
          <Button
            disabled={loading}
            className={`${loading ? "opacity-90" : ""} center_button_form`}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </main>
    </>
  );
}

export default Page;
