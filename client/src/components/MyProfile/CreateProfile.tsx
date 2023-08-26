"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useConnectContext } from "@/context/context";
import Compress from "react-image-file-resizer";
import Image from "next/image";

import user from "../../assets/user.png";

function CreateProfile() {
  const [userImg, setUserImg] = useState(user);
  const { userId, userDocumentId } = useConnectContext();
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [github, setGitHub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [college, setCollege] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [collegeCity, setCollegeCity] = useState("");

  //* !!!  Logic for base64 image conversion so that we can preview it as well
  const handleImage = (e: any) => {
    // create a file input dynamically
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // define a onChange image to read and show the file
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // onFileResize()

          //* Below it the functionality of on FileResize function which we trigger if we choose a file using input type equals file
          Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (uri: any) => {
              // You upload logic goes here
              console.log("uri", uri);
              setUserImg(uri);
            },
            "base64" // blob or base64 default base64
          );
        };
        reader.readAsDataURL(file);
      }
    };
    // simulate a click
    fileInput.click();
  };

  const submitHandlerForm = async (e: any) => {
    e.preventDefault();
    const formData = {
      authId: userId,
      email: email,
      github: github,
      linkedin: linkedin,
      leetcode: leetcode,
      college: college,
      collegeLocation: collegeLocation,
      collegeCity: collegeCity,
      dp: userImg,
    };
    setValue(100);
    await fetch(`http://localhost:4000/user/user-profile/${userDocumentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  const nextSwitchHandler = async (e: any) => {
    e.preventDefault();
    setValue(66);
  };

  useEffect(() => {
    if (value == 100) {
      window.location.href = "/profile";
    }
  }, [value]);

  return (
    <>
      <Progress value={value} className="w-[40%] mx-auto my-10" />
      <div className="create-profile-form">
        {value == 66 && (
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
                onClick={() => setValue(33)}
              >
                Back
              </Button>
              <Button className="text-sm px-6 py-4 mx-auto">Submit</Button>
            </div>
          </form>
        )}
        {value == 33 && (
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
            <div className="flex gap-2 mx-auto">
              <Button
                className="text-sm w-fit mt-4 mx-auto px-6 py-4"
                onClick={() => setValue(0)}
              >
                Back
              </Button>
              <Button className="text-sm w-fit mt-4 mx-auto px-6 py-4">
                Next
              </Button>
            </div>
          </form>
        )}
        {value == 0 && (
          <>
            <div
              className=" w-48 h-48 mx-auto overflow-hidden cursor-pointer rounded-[50%]  bg-black"
              onClick={handleImage}
            >
              <Image
                src={userImg}
                width={200}
                height={200}
                alt="Picture of the author"
              />
              {/* // <img src={userImg} alt="" /> */}
            </div>
            <Button
              className="text-sm w-fit mt-4 mx-auto px-6 py-4"
              onClick={(e) => setValue(33)}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default CreateProfile;
