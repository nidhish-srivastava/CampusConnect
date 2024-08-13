import { connectDb } from "@/prisma/connectToDb";
import prisma from "@/prisma/connetToPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,{params} : {params : {id : string}}){
    const {id} = params
    try {
        await connectDb()
        const {college,email,github,leetcode,linkedin,collegeLocation,collegeCity} = await req.json()
        const updatedUser = await prisma.user.update({
            where : {id : Number(id)},
            data : {
                college,
                email,
                github,
                leetcode,
                linkedin,
                collegeLocation,
                collegeCity,
            }
        })
        return NextResponse.json({updatedUser});
    } catch (error) {
        return Response.json({ message: 'Internal server error' },{status : 500});
    }
}
