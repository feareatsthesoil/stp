import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { NextApiResponse } from "next"


async function directorySubmit(req: any, res: NextApiResponse) {
  const { body } = req
  const {userId} = req.auth

  const {id} = req.query
  const client = new PrismaClient();
  const contact = await client.contacts.findFirst({where : {id: Number(id)}})
  if(!contact)
    return res.status(404).json({message: "Contact not found"})
  if(contact.userId!==userId)
    return res.status(403).json({message: "You are not authorized to edit this"})

  await client.contacts.update({ where:{id: contact.id}, data: {...body, display: body.profile ? body.display: true}})
  return res.status(200).json({ message: "inserted succesfully" })
}
export default withAuth(directorySubmit)