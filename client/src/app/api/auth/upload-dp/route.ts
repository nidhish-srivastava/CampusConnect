
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import {v2 as cloudinary} from 'cloudinary'

// Initialize Prisma Client
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const uploadImage = (image : string,id : any) =>{
  return new Promise((resolve,reject)=>{
      cloudinary.uploader.upload(
          image,
          {public_id : id},
          function (error : any,result : any){
              if(result && result.secure_url){

                  return resolve(result.secure_url)
              }
          return reject(error)
          }
      )
  })
}

export async function PATCH(req: NextRequest) {
  try {
    const { username, dp } = await req.json();
    const imageId = nanoid().split('-')[0];

    // Upload image and get URL
    const imageUrl : any = await uploadImage(dp, imageId);

    // Update the dp field of the user with the new image URL
    const updatedUser = await prisma.auth.update({
      where: { username },
      data: { dp: imageUrl },
    });

    if (updatedUser) {
      return NextResponse.json({ status: 'Image updated successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
