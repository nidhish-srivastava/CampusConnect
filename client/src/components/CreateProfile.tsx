"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useConnectContext } from "@/context/context";

function CreateProfile() {
  const {userId,userDocumentId} = useConnectContext()
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [github, setGitHub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [college, setCollege] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [collegeCity,setCollegeCity] = useState("")

  const submitHandlerForm = async (e: any) => {
    e.preventDefault();
    const formData = {
      authId : userId,
      email: email,
      github: github,
      linkedin: linkedin,
      leetcode: leetcode,
      college: college,
      collegeLocation: collegeLocation,
      collegeCity : collegeCity
    };
    setValue(100)
     await fetch(`http://localhost:4000/user/user-profile/${userDocumentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
  };

  const nextSwitchHandler = async (e: any) => {
    e.preventDefault();
    setValue(50);
  };

  useEffect(()=>{
    if(value==100){
      console.log("fuck me");
      window.location.href = "/profile"
    }
  },[value])

  return (
    <>
      <Progress value={value} className="w-[40%] mx-auto my-10" />
      <div className="create-profile-form">
        {value == 50 && (
          <form
            className="create-profile-form w-[24%]"
            onSubmit={submitHandlerForm}
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Enter Email</Label>
              <Input
                required
                autoFocus={true}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email id*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="github">Github Profile</Label>
              <Input
                required
                type="url"
                id="github"
                value={github}
                onChange={(e) => setGitHub(e.target.value)}
                placeholder="Enter Github url*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                required
                type="url"
                id="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="Enter LinkedIn url*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="leetcode">Leetcode Profile</Label>
              <Input
                type="url"
                id="leetcode"
                placeholder="Enter Leetcode url"
                value={leetcode}
                onChange={(e) => setLeetcode(e.target.value)}
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
              <Button className="text-sm px-6 py-4 mx-auto">Submit</Button>
            </div>
          </form>
        )}
        {value == 0 && (
          <form
            className="create-profile-form w-[24%]"
            onSubmit={nextSwitchHandler}
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="college">Enter College Name</Label>
              <Input
                required
                autoFocus={true}
                type="text"
                id="college"
                placeholder="Enter College*"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="">College location</Label>
              <Textarea
                required
                id="college"
                spellCheck={false}
                placeholder="Enter College location*"
                value={collegeLocation}
                onChange={(e) => setCollegeLocation(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="">College City</Label>
              <Input
                required
                id="collegeCity"
                spellCheck={false}
                placeholder="Enter College city*"
                value={collegeCity}
                onChange={(e) => setCollegeCity(e.target.value)}
              />
            </div>

            <Button className="text-sm w-fit mt-4 mx-auto px-6 py-4">
              Next
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default CreateProfile;
