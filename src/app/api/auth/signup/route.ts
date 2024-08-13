import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "@/prisma/connetToPrisma";
import { connectDb } from "@/prisma/connectToDb";
export async function POST(req:NextRequest) {
    try {
    await connectDb()
    const{username,password} = await req.json()
        const existingUser = await prisma.auth.findUnique({where : {username}})
        if (existingUser) {
           return Response.json({error : "User already exists"},{status : 403})
        } 
        const newUser = await prisma.auth.create({
            data: {
              username,
              password: bcrypt.hashSync(password),
            },
          })
        const token = jwt.sign({ username }, process.env.SECRET!, { expiresIn: '1d' })
        await prisma.user.create({
            data : {
                authId : newUser?.id,
                username : newUser.username,
                followers : {
                    connect : []
                },
                following : {
                    connect : []
                }
            }
        })
        const response = NextResponse.json({
            message: 'Signup successful',
            success: true,
          })
          response.cookies.set('token', token, {
            httpOnly: true,
          });
          return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
