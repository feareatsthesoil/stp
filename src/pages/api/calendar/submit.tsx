import {NextApiRequest, NextApiResponse} from "next"
import {insertCalendarData} from "../../../libs/sheets"

export default async function calendarSubmit (req: NextApiRequest, res: NextApiResponse) {
  const {body} = req

  await insertCalendarData(body)
  return res.status(200).json({message: "inserted succesfully"})
}