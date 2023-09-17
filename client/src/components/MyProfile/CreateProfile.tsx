"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useConnectContext } from "@/context/context";
import Compress from "react-image-file-resizer";
import Image from "next/image";
// import {ZodType, z} from "zod"
import { useForm } from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod"
// import user from "../../assets/user.png";
import { useRouter } from "next/navigation";
import { base64 } from "@/components/assets/base64";
import { url } from "@/app/page";

type FormData = {
  email?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  college?: string;
  collegeLocation?: string;
  collegeCity?: string;
};

function CreateProfile() {
  const router = useRouter();
  const [userImg, setUserImg] = useState(base64);
  const { userId, userDocumentId, user ,setImageUrl} = useConnectContext();
  const [value, setValue] = useState(0);

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
              // console.log("uri", uri);
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

  console.log("render create profile");

  // * RIGHT NOW ITS NOT WORKING  Connecting zod with react hook form(using resolver package)
  // const {register,handleSubmit,formState : {errors}} = useForm<FormData>({resolver : zodResolver(schema)})

  const { register, handleSubmit } = useForm();

  const imageUploadPromise = async (): Promise<any> => {
    console.log("image upload");
    return await fetch(`http://localhost:4000/auth/uploadImage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, dp: userImg }),
    });
  };

  const nextPromise = async (college: string | undefined): Promise<any> => {
    console.log("next");
    return await fetch(`http://localhost:4000/college`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ college: college }),
    });
  };

  // * No need to create a new promise
  const submitPromise2 = async (formData: FormData): Promise<any> => {
    console.log("submit");
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await fetch(
            `http://localhost:4000/user/user-profile/${userDocumentId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            }
          )
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  const submitPromise = async (formData: FormData): Promise<any> => {
    console.log("submit");
    return await fetch(
      `http://localhost:4000/user/user-profile/${userDocumentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
  };

  const submitHandlerForm = async (data: FormData) => {
    const formData = {
      authId: userId,
      email: data.email,
      github: data.github,
      linkedin: data.linkedin,
      leetcode: data.leetcode,
      college: data.college,
      collegeLocation: data.collegeLocation,
      collegeCity: data.collegeCity,
    };
    try {
      setImageUrl(userImg)
      setValue(100);
      router.push("/")
      await Promise.all([
        imageUploadPromise(),
        nextPromise(formData.college),
        submitPromise(formData),
      ]);
    } catch (error) {
    }
  };

  return (
    <>
      <Progress value={value} className="w-[40%] mx-auto my-10" />
      <div className="create-profile-form">
        {value == 66 && (
          <form
            className="create-profile-form w-[24%]"
            onSubmit={handleSubmit(submitHandlerForm)}
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Enter Email</Label>
              <Input
                required
                autoFocus={true}
                type="email"
                id="email"
                {...register("email")}
                placeholder="Enter Email id*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="github">Github Profile</Label>
              <Input
                required
                type="url"
                id="github"
                {...register("github")}
                placeholder="Enter Github url*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                required
                type="url"
                id="linkedin"
                {...register("linkedin")}
                placeholder="Enter LinkedIn url*"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="leetcode">Leetcode Profile</Label>
              <Input
                type="url"
                id="leetcode"
                placeholder="Enter Leetcode url"
                {...register("leetcode")}
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
          <div
            className="create-profile-form w-[24%]"
            // onSubmit={}
          >
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="college">Enter College Name</Label>
              <Input
                required
                autoFocus={true}
                type="text"
                id="college"
                placeholder="Enter College*"
                {...register("college")}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="">College location</Label>
              <Textarea
                required
                id="college"
                spellCheck={false}
                placeholder="Enter College location*"
                {...register("collegeLocation")}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="">College City</Label>
              <Input
                required
                id="collegeCity"
                spellCheck={false}
                placeholder="Enter College city*"
                {...register("collegeCity")}
              />
            </div>
            <div className="flex gap-2 mx-auto">
              <Button
                className="text-sm w-fit mt-4 mx-auto px-6 py-4"
                onClick={() => setValue(0)}
              >
                Back
              </Button>
              <Button
                onClick={() => setValue(66)}
                className="text-sm w-fit mt-4 mx-auto px-6 py-4"
              >
                Next
              </Button>
            </div>
          </div>
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
            </div>
            <Button
              className="text-sm w-fit mt-4 mx-auto px-6 py-4"
              onClick={() => setValue(33)}
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
