import { User, clerkClient } from "@clerk/nextjs/api";
import { prisma } from "./prisma";

export async function getUserData(userId: string, force: boolean=false){

    const minsAgo = new Date((Date.now()) - 30*60*1000)

    
    const userRow = await prisma.userDataCache.findFirst({where: {userId: userId, 
        createdAt: {gte: minsAgo}
    }
    
    })

    if(!userRow || force){
       
        await prisma.userDataCache.deleteMany({where:{ userId: userId}})
        const user = await clerkClient.users.getUser(userId)
       
            await prisma.userDataCache.create({data: {userId, data: {...user} as any}})
            return user
       
    }else{
       
         return userRow.data as unknown as User}
}