import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { insertCalendarData } from "../../../libs/sheets"
import { CalendarEventType } from "../../../types"

export default async function calendarSubmit(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  console.log({body})
  const client = new PrismaClient()
  await client.events.create({data: {...body, starts_at: new Date(body.starts_at), ends_at: new Date(body.ends_at) } })
  return res.status(200).json({ message: "inserted succesfully" })
}