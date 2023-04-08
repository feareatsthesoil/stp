import { PrismaClient } from "@prisma/client"
import { NextApiResponse } from "next"

export default (async (req: any, res: NextApiResponse) => {
  const client = new PrismaClient()
  const calendarData = await client.events.findMany({ orderBy: { starts_at: "asc" } })

  return res.status(200).json(calendarData)
})