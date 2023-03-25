import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { insertDirectoryData } from "../../../libs/sheets"

export default async function directorySubmit(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req
  const client = new PrismaClient();
  await client.contacts.create({data: body})
  //await insertDirectoryData(body)
  return res.status(200).json({ message: "inserted succesfully" })
}