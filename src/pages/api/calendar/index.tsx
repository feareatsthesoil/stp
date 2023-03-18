import { NextApiRequest, NextApiResponse } from "next"
import { getCalendarData, insertCalendarData } from "../../../libs/sheets"

export default async function calendarSubmit(req: NextApiRequest, res: NextApiResponse) {
    const calendarData = await getCalendarData()
    const data = calendarData.slice(0, calendarData.length)
  return res.status(200).json(data)
}