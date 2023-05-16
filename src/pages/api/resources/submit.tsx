import { NextApiResponse } from "next"
import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"

async function resourceSubmit(req: any, res: NextApiResponse) {
    const { id } = req.query
    console.log("ID:", id);
    try {
        const { body } = req
        const { userId } = req.auth
        const { id, ...rest } = body
        const client = new PrismaClient();
        await client.resource.create({ data: { ...rest, userId } })
        return res.status(200).json({ message: "Inserted succesfully" })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json({ error: error.message })
        } else {
            console.error(error);
            return res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}

export default withAuth(resourceSubmit)