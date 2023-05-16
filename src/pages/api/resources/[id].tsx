import { NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { withAuth } from "@clerk/nextjs/api"

async function resourceSubmit(req: any, res: NextApiResponse) {
    const { body } = req
    const { userId } = req.auth
    const { id } = req.query
    const client = new PrismaClient();
    const resource = await client.resource.findFirst({ where: { id: Number(id) } })
    if (!resource)
        return res.status(404).json({ message: "resource not found" })

    if (req.method === "PUT" || req.method === "DELETE") {
        if (resource.userId !== userId)
            return res.status(403).json({ message: "You are not authorized to edit this" })

        if (req.method === "PUT") {
            await client.resource.update({ where: { id: resource.id }, data: { ...body, display: body.profile ? body.display : true } })
            return res.status(200).json(resource)
        } else {
            await client.resource.delete({ where: { id: resource.id } })
            return res.status(200).json({ message: "Deleted suīcesfully" })
        }

    }
    res.status(200).json(resource)

}
export default withAuth(resourceSubmit)