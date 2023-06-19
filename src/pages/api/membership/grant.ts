import { NextApiResponse } from "next"
import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { prisma } from "../../../utils/prisma";

async function grant(req: any, res: NextApiResponse) {
    const { userId } = req.auth
    if (!userId)
        return res.status(401).json({ message: "Not logged in." });

    if (req.query.code !== process.env.ACCESS_MEMBERSHIP_CODE) {
        return res.status(403).json({ message: "Code is invalid." })
    }
    if (!process.env.ACCESS_MEMBERSHIP_CODE || process.env.ACCESS_MEMBERSHIP_CODE?.trim() === '') {
        return res.status(403).json({ message: "Option not available." })
    }

    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)

    await prisma.purchases.create({
        data: {
            purchasePrice: -1,
            stripeIntentId: "",
            userId,
            expiryDate: date
        }
    })
    res.json({ "message": "Successfully purchased" })
}
export default withAuth(grant)