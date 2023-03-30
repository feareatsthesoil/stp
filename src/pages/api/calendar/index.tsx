import { PrismaClient } from "@prisma/client"
import { getPrismaClient } from "@prisma/client/runtime"
import { NextApiRequest, NextApiResponse } from "next"
import {withAuth} from "@clerk/nextjs/api"

export default ( async(req: any, res: NextApiResponse)=>{
 
  const client = new PrismaClient()
  const calendarData =  await client.events.findMany()
   
  return res.status(200).json(calendarData)
})