"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Button } from "./ui/button";

function CreateProfile() {
  const [value, setValue] = useState(0);
  const completeProfile = async()=>{
    const response = await fetch(`http://localhost:4000/user-profile`,{

    })
  }

  const submitHandlerForm = async(e : any) =>{
    e.preventDefault()
    setValue(100)
  }
  const nextSwitchHandler = async(e : any) =>{
    e.preventDefault()
    setValue(50)
  }
  return (
    <>
      <Progress value={value} className="w-[40%] mx-auto my-10" />
      <div className="create-profile-form">
        {value == 50 && (
          <form className="create-profile-form w-[24%]" onSubmit={submitHandlerForm}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Enter Email</Label>
              <Input
                required
                autoFocus={true}
                type="email"
                id="email"
                placeholder="Enter Email id*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="github">Github Profile</Label>
              <Input
                required
                type="url"
                id="github"
                placeholder="Enter Github url*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                required
                type="url"
                id="linkedin"
                placeholder="Enter LinkedIn url*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="twitter">Twitter Profile</Label>
              <Input
                required
                type="url"
                id="twitter"
                placeholder="Enter Twitter url*"
              />
            </div>
            <div className="flex mt-2 justify-center gap-2 mx-auto">
              <Button
                className="text-sm px-6 py-4"
                type="button"
                onClick={() => setValue(0)}
              >
                Prev
              </Button>
              <Button
                className="text-sm px-6 py-4 mx-auto"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
        {value == 0 && (
          <form className="create-profile-form w-[24%]" onSubmit={nextSwitchHandler} >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="college">Enter College Name</Label>
              <Input
                required
                autoFocus={true}
                type="text"
                id="college"
                placeholder="Enter College*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="">College location</Label>
              <Textarea
                required
                autoFocus={true}
                id="college"
                spellCheck = {false}
                placeholder="Enter College location*"
              />
            </div>
            
            <Button
              className="text-sm w-fit mt-4 mx-auto px-6 py-4"
            >
              Next
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default CreateProfile;
