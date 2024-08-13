import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(req : NextRequest){

    const {userId,followUserId} = await req.json()
    try {
        const updateFollowing = await prisma.user.update({
            where : {id : userId},
            data : {
                following : {
                    connect : {id : followUserId}
                }
            }
        })
        if (!updateFollowing) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const updateFollowers = await prisma.user.update({
            where : {id : followUserId},
            data : {
                followers : {
                    connect : {id : userId}
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