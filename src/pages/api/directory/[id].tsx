import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { NextApiResponse } from "next"


async function directorySubmit(req: any, res: NextApiResponse) {
  const { body } = req
  const { userId } = req.auth


  const { id } = req.query
  const client = new PrismaClient();
  const contact = await client.contacts.findFirst({ where: { id: Number(id) } })
  if (!contact)
    return res.status(404).json({ message: "Contact not found" })

  if (req.method === "PUT" || req.method === "DELETE") {
    if (contact.userId !== userId)
      return res.status(403).json({ message: "You are not authorized to edit this" })

    if (req.method === "PUT") {
      await client.contacts.update({ where: { id: contact.id }, data: { ...body, display: body.profile ? body.display : true } })
      return res.status(200).json(contact)
    } else {
      await client.contacts.delete({ where: { id: contact.id } })
      return res.status(200).json({ message: "Deleted suīcesfully" })
    }

  }
  res.status(200).json(contact)

}
export default withAuth(directorySubmit)