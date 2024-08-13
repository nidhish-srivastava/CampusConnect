import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma  = new PrismaClient()

export async function PATCH(req:NextRequest,{params} : {params : {id : string}}){
    const {id} = params
    const {college,email,github,leetcode,linkedin,collegeLocation,collegeCity} = await req.json()
    try {
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
