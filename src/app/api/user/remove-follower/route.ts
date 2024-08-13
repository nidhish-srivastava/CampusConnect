import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req : NextRequest){
    try {
        await connectDb()
        const {userId,unfollowUserId} = await req.json()
        const updateFollowers = await prisma.user.update({
            where : {id : userId},
            data : {
                followers : {
                    disconnect : {id : unfollowUserId}
                }
            }
        })
        if (!updateFollowers) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const updateFollowing = await prisma.user.update({
            where : {id : unfollowUserId},
            data : {
                following : {
                    disconnect : {id : userId}
                }
            }
        })
        if (!updateFollowing) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error("Error removing follow:", error); 
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}