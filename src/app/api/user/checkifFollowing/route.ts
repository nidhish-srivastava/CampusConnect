import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req : NextRequest){
    const {userId,myId} = await req.json()
    try {
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