import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        await connectDb()
        const {userId,myId} = await req.json()
        const user = await prisma.user.findUnique({
            where : {id : myId},
            select : {
                following : {
                    select : {
                        id : true
                    }
                    }
            }
        })
        if(!user){
            return NextResponse.json({message : 'User not found'},{status : 404})
        }
        const isFollowing = user.following.some(e=>e.id == userId)
        return NextResponse.json(isFollowing ? 'true' : 'false')
    } catch (error) {
        return NextResponse.json({message : 'Internal server error'},{status : 500})
    }
}