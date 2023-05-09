import { NextApiResponse } from "next"
import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"

async function grant(req: any, res: NextApiResponse) {
    const { userId } = req.auth
    if (!userId)
        return res.status(401).json({ message: "Not logged in." });
    const client = new PrismaClient();
    if (req.query.code !== process.env.ACCESS_MEMBERSHIP_CODE) {
        return res.status(403).json({ message: "Code is invalid." })
    }
    if (!process.env.ACCESS_MEMBERSHIP_CODE || process.env.ACCESS_MEMBERSHIP_CODE?.trim() === '') {
        return res.status(403).json({ message: "Option not available." })
    }

    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)

    await client.purchases.create({
        data: {
            purchasePrice: -1,
            stripeIntentId: "",
            userId,
            expiryDate: date
        }
    })
}
export default withAuth(grant)