import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import {  NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest,{params} : {params : {username : string}}){
    const {username} = params
    try {
        await connectDb()
        const user = await prisma.user.findUnique({
            where : {username},
            select : {
                following : {
                    select : {
                        id : true,
                        auth : {
                            select : {
                                username : true,
                                dp : true
                            }
                        }
                    }
                }
            }
        })
        if (!user) {
            return new NextResponse('No results found', { status: 404 });
        }
        return NextResponse.json(user.following)
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "Internal server error"},{status : 500})
    }
}