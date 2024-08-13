import prisma from "./connetToPrisma"

export const connectDb = async () => {
    try {
        console.log("Connected through prisma")
        await prisma.$connect()
    } catch (error:any) {
        return new Error(error.message)
    }
}