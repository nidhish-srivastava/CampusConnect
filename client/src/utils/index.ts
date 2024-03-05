import { AuthId } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Compress from "react-image-file-resizer";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROJECT_NAME = "CampusConnect"

//  const baseUrl = `http://localhost:4000`
 const baseUrl = `https://campus-connect-one.vercel.app`

const defaultDp = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"


 const debounce = (query:string,fn:()=>void,setSearchResults : (setSearchResults : AuthId[])=>void )=>{
  return setTimeout(()=>{
    if(query.length>0) fn()
    if(query.length==0) setSearchResults([])
  },1000)
}

const followPromise = async (
    followUserId: string | undefined,
    userDocumentId: string | undefined
  ): Promise<any> => {
    return await fetch(`${baseUrl}/user/follow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userDocumentId, followUserId }),
    });
  };
  

  const unfollowPromise = async(
    unfollowUserId : string | undefined,
    userDocumentId : string | undefined
  ) : Promise<any> =>{
   return await fetch(`${baseUrl}/user/unfollow`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userDocumentId,
        unfollowUserId
      }),
    });
  }
  
  const checkFollowersFollowingPromise = async(userId : string | undefined,myId : string) =>{
  const response = await fetch(`${baseUrl}/user/followingfollowers/check`,
  {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
    },
    body : JSON.stringify({
      userId : userId,
      myId : myId
    })
  })
  return response.json()
}

export const imageUploadPromise = async (user:string | undefined,userImg : string | undefined): Promise<any> => {
  // console.log("image upload");
  return await fetch(`${baseUrl}/auth/uploadImage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, dp: userImg }),
  });
};

export const handleImage = (setUserImg : (uri : string)=>void) => {
  
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
            // console.log(uri);
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
  
export {
  checkFollowersFollowingPromise,
  unfollowPromise,
  followPromise,
  debounce,
  defaultDp,
  baseUrl,
  PROJECT_NAME
}