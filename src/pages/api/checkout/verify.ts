import { withAuth } from "@clerk/nextjs/api";
import { NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function checkoutCreate(req: any, res: NextApiResponse) {
  const { body } = req;
  const { userId } = req.auth;
  const session = await stripe.checkout.sessions.retrieve(req.body.id);
  if (session.status == "complete") {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const purchase =
      (await prisma.purchases.findFirst({
        where: { stripeIntentId: session.id },
      })) ??
      (await prisma.purchases.create({
        data: {
          purchasePrice: session.amount_total / 100,
          userId,
          expiryDate,
          stripeIntentId: session.id,
        },
      }));

    return res.json({ success: true, purchase });
  }
}
export default withAuth(checkoutCreate);
