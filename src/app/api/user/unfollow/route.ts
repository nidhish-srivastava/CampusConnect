import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req : NextRequest){
    try {
        await connectDb()
        const {userId,unfollowUserId} = await req.json()
        const updateFollowing = await prisma.user.update({
            where : {id : userId},
            data : {
                following : {
                    disconnect : {id : unfollowUserId}
                }
            }
        })
        if (!updateFollowing) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const updateFollowers = await prisma.user.update({
            where : {id : unfollowUserId},
            data : {
                followers : {
                    disconnect : {id : userId}
                }
            }
        })
        if (!updateFollowers) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({message : 'User followed successfully'})
    } catch (error) {
        console.error("Error updating user follow:", error); 
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}