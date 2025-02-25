import { AuthId } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Compress from "react-image-file-resizer";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const PROJECT_NAME = "CampusConnect"

const baseUrl = `${process.env.BASE_URL || ""}/api`

const defaultDp = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"


 const debounce = (query:string,fn:()=>void,setSearchResults : (setSearchResults : AuthId[])=>void )=>{
  return setTimeout(()=>{
    if(query.length>0) fn()
    if(query.length==0) setSearchResults([])
  },2000)
}

export const handleImage = (setUserImg : (uri : string)=>void) => {

  if (typeof document === "undefined") return;
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


const dateFormatter = (date ?: any) =>{
  const dateObj = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // This will display time in AM/PM format
  };
  
  return new Intl.DateTimeFormat('en-US', options as any).format(dateObj);
}
  
export {
  debounce,
  defaultDp,
  baseUrl,
  PROJECT_NAME,
  dateFormatter,
}