import { withAuth, clerkClient } from "@clerk/nextjs/api";
import { NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function checkoutCreate(req: any, res: NextApiResponse) {
  const { userId } = req.auth;
  if (!userId) {
    return res.status(401).json({ message: "Already a member" });
  }
  const sessionExisting = await prisma.purchases.findFirst({
    where: { userId, expiryDate: { gte: new Date() } },
  });
  if (sessionExisting) {
    return res.status(400).json({ message: "already purchased membership" });
  }
  const user = await clerkClient.users.getUser(userId);

  const primaryEmailId = user.primaryEmailAddressId;
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: "price_1K475oGTFNprTJMygonfn41h", quantity: 1 }],
    mode: "subscription",
    success_url: `${req.headers.origin}/checkout/success?success=true&id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/checkout/cancel?canceled=true`,
    automatic_tax: { enabled: true },
    customer_email: user.emailAddresses.find(
      (emailAddress) => emailAddress.id === primaryEmailId
    )!.emailAddress,
  });
  return res.json({ redirect: session.url });
}
export default withAuth(checkoutCreate);
