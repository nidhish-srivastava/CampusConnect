import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "@/types";
import { Button } from "./ui/button";
import { useConnectContext } from "@/context/context";
// import { Trash2, PlusCircle } from "lucide-react";
import { Loader2 } from "lucide-react"
import { baseUrl } from "@/utils";
import { Toaster, toast } from "sonner";

type props = {
  profileObject: UserType | undefined
  updatedDp : string | undefined
  setUpdatedDp : React.Dispatch<React.SetStateAction<string>>
  setProfileObject ?: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

const ProfileBaseInfo = ({ profileObject,updatedDp,setUpdatedDp  }:  props ) => {
  const {user, userDocumentId} = useConnectContext();
  const [isFollow,setIsFollow] = useState(false)
  // const [updateLoading,setUpdateLoading] = useState(false)
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const visitedUserId = profileObject?.id

  // let imageUrl = profileObject?.authId?.dp as string;
  // let public_id = '';
  // if (imageUrl) {
  //   let parts = imageUrl.split('/');
  //   if (parts.length > 0) {
  //     const filenameWithExtension = parts[parts.length - 1]; // Get the last part of the URL
  //     let filenameParts = filenameWithExtension.split('.');
  //     if (filenameParts.length > 0) {
  //       public_id = filenameParts[0];
  //     }
  //   }
  // }

  // const updateImageHandler = async()=>{
  //   setUpdateLoading(true)
  //   try {
  //     const response = await fetch(`${baseUrl}/auth/uploadImage`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username: user, dp: updatedDp }),
  //     });
  //       if(response.status==201){
  //         setUpdateLoading(false)
  //         setImageUrl(updatedDp as string)
  //         setIsModalOpen(false)
  //       }
  //     } catch (error) {
  //     setUpdateLoading(false)
  //   }
  // }
  
  // const deleteImageHandler = async() =>{
  //   try {
  //     const response = await fetch(`${baseUrl}/auth/removeDp`,{
  //       method : "PUT",
  //       headers : {
  //         "Content-Type" : "application/json"
  //       },
  //       body : JSON.stringify({user,public_id})
  //     })
  //     if(response.status==200){
  //       const body = await response.json()
  //       setUpdatedDp(body)
  //       setImageUrl(body)
  //     }
  //   } catch (error) {
      
  //   }
  // }
  
  const unfollow = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/unfollow`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unfollowUserId : visitedUserId,
          userId : userDocumentId
        }),
      })
      if(response.status==200){
        setIsFollow(false)
      }
    } catch (error) {

    }
  }
  
  const follow = async () => {
    if(typeof user == "undefined") {
      return toast.error("Please login to follow")
    }
    try {
      const response = await fetch(`${baseUrl}/user/follow`,{
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ userDocumentId, userId,followUserId : visitedUserId }),
        body: JSON.stringify({ userId : userDocumentId,followUserId : visitedUserId }),
      })
      if(response.status==200){
        setIsFollow(true)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
      const checkIfFollowing = async () => {
        try {
          const response = await fetch(`${baseUrl}/user/checkifFollowing`,
          {
            method : "POST",
            headers : {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({
              userId : visitedUserId,
              myId : userDocumentId
            })
          })
          const data = await response.json()
          data=="true" ?  setIsFollow(true) : setIsFollow(false)
        } catch (error) {
          console.log(error);
        }
      }
    checkIfFollowing();
  },[userDocumentId])

  // useEffect(()=>{
  //   if(updatedDp != profileObject?.authId?.dp ){
  //     setIsModalOpen(true)
  //   }
  // },[updatedDp])


  return (
    <div className="flex justify-center gap-10 items-center">
      <Toaster/>
      <div>
      {/* {isModalOpen && (
          <ImageModal updateLoading={updateLoading} updateDpHandler={updateImageHandler} imageUrl={updatedDp} closeModal={closeModal} />
        )} */}
        <Image
          src={updatedDp as string}
          width={80}
          height={80}
          alt="Picture of the author"
        />
        {
          /*
          profileObject?.authId.username==user && profileObject?.email.length!=0 &&
        <div className="flex justify-center gap-2 mt-2 items-center">
          {defaultDp!=updatedDp
           ? 
          <span
          onClick={deleteImageHandler}
          >
          <Trash2 className="w-5" />
        </span>
        : null
          }
        <span
        onClick={()=>{
          handleImage(setUpdatedDp)
          setIsClicked(true)
        }
      }
        >
          <PlusCircle size={20} strokeWidth={2} />
        </span>
          </div>
          */
        }
      </div>
      <div className="">
        <h2 className="text-center text-xl font-medium m-2 mb-4">
          {profileObject?.username}
        </h2>
        <div className="flex gap-2">
          <Link href={`/${profileObject?.username}/followers`}>
            <Button className="text-[14px] py-6 px-2 rounded-[3px]">
              {profileObject?.followers?.length}
              <br />
              Followers{" "}
            </Button>
          </Link>
          <Link href={`/${profileObject?.username}/following`}>
            <Button className="text-[14px] py-6 px-2 rounded-[3px]">
              {profileObject?.following?.length}
              <br />
              Following{" "}
            </Button>
          </Link>
        </div>
        <div className="mt-4 text-center">
              {profileObject?.username !== user &&  user?.length!=0 ? (
                <>
            {isFollow
            ?
            <Button className="bg-blue-600 hover:bg-violet-500 text-[15px]" onClick={unfollow}>
              Unfollow
            </Button>
            : 
            <Button className="bg-blue-600 hover:bg-violet-500 text-[15px]" onClick={follow}>
              Follow
            </Button>
            }
            </>
            ): null
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileBaseInfo;


type ImageModalProp = {
  imageUrl : string | undefined
  closeModal : React.MouseEventHandler<HTMLButtonElement> | undefined
  updateDpHandler : ()=> void
  updateLoading : boolean | undefined
}

export function ImageModal({ imageUrl, closeModal,updateDpHandler,updateLoading } : ImageModalProp) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-75"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-end">
            <button className="text-gray-400 hover:text-gray-800" onClick={closeModal}>
              <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M18.293 1.293a1 1 0 0 0-1.414 0L10 8.586 2.707 1.293a1 1 0 1 0-1.414 1.414L8.586 10 1.293 17.293a1 1 0 0 0 0 1.414 1 1 0 0 0 1.414 0L10 11.414l7.293 7.293a1 1 0 0 0 1.414 0 1 1 0 0 0 0-1.414L11.414 10l7.293-7.293a1 1 0 0 0 0-1.414z"/>
              </svg>
            </button>
          </div>
          <div className="my-5">
            <img src={imageUrl} alt="Image Preview" className="w-full" />
          </div>
          <div className="text-center">
            {
              updateLoading ? 
            <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
    :
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={updateDpHandler}
            >
              {updateLoading}
              Update
            </Button>

            }
          </div>
        </div>
      </div>
    </div>
  );
}
