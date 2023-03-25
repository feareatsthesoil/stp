import { PrismaClient } from "@prisma/client"
import { getPrismaClient } from "@prisma/client/runtime"
import { NextApiRequest, NextApiResponse } from "next"


export default async function calendarSubmit(req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient()
  const calendarData =  await client.events.findMany()
   
  return res.status(200).json(calendarData)
}