import { withAuth, clerkClient } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { NextApiResponse } from "next"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function checkoutCreate(req: any, res: NextApiResponse) {

    const { userId } = req.auth
    if (!userId) {
        return res.status(401).json({ message: "Already a member" })
    }
    const client = new PrismaClient();
    const sessionExisting = await client.purchases.findFirst({ where: { userId, expiryDate: { gte: new Date() } } })
    if (sessionExisting) {
        return res.status(400).json({ message: "already purchased membership" })
    }
    const user = await clerkClient.users.getUser(userId)

    const primaryEmailId = user.primaryEmailAddressId
    const session = await stripe.checkout.sessions.create({
        line_items: [
            { price: 'price_1MtKT9AQ0Pr8toHhHUEQjzwV', quantity: 1 }
        ], mode: "payment",
        success_url: `${req.headers.origin}/checkout/success?success=true&id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout/cancel?canceled=true`,
        automatic_tax: { enabled: true },
        customer_email: user.emailAddresses.find((emailAddress) => emailAddress.id === primaryEmailId)!.emailAddress

    })
    return res.json({ redirect: session.url })
}
export default withAuth(checkoutCreate)