"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useConnectContext } from "@/context/context";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UserType } from "@/types";
import { baseUrl, imageUpload,handleImage,defaultDp } from "@/utils";


function CreateProfile() {
  const router = useRouter();
  const [userImg, setUserImg] = useState(defaultDp);
  const { userDocumentId, user ,setImageUrl,imageUrl} = useConnectContext();
  const [value, setValue] = useState(0);
  const [isAuthenticate,setIsAuthenticate] = useState(false)
  const { register, handleSubmit } = useForm();


  const nextPromise = async (college: string | undefined): Promise<any> => {
    // console.log("next");
    return await fetch(`${baseUrl}/college`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ college: college }),
    });
  };


  const submitPromise = async (formData: Partial<UserType>): Promise<any> => {
    // console.log("submit");
    return await fetch(
      `${baseUrl}/user/user-profile/${userDocumentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
  };

  const submitHandlerForm = async (data: Partial<UserType>) => {
    const formData = {
      email: data.email,
      github: data.github,
      linkedin: data.linkedin,
      leetcode: data.leetcode,
      college: data.college,
      collegeLocation: data.collegeLocation,
      collegeCity: data.collegeCity,
    };
    try {
      setValue(100);
      router.push(`/`)
      await Promise.all([
        imageUpload(user,userImg),
        nextPromise(formData.college),
        submitPromise(formData),
      ]);
      setImageUrl(userImg)
    } catch (error) {
    }
  };

  useEffect(()=>{
     if(imageUrl==undefined){
      console.log("check1");
      setIsAuthenticate(true)
     }
     else{
      setIsAuthenticate(false)
      // router.replace('/')
     }
  },[imageUrl])
  

  return (
    <>
    {
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
              onClick={()=>handleImage(setUserImg)}
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
    }
    </>
  );
}

export default CreateProfile;
