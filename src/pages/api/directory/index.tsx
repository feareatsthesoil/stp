import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getCalendarData, insertCalendarData } from "../../../libs/sheets"

export default async function directoryIndex(req: NextApiRequest, res: NextApiResponse) {
    const client = new PrismaClient()

    const data = await client.contacts.findMany({where: {approved: true}})
    
  return res.status(200).json(data)
}