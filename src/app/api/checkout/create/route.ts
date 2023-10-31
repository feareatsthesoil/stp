import { prisma } from "@/utils/prisma";
import { getUserData } from "@/utils/userData";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  const url = new URL(req.url);
  if (!userId) {
    return Response.json({ message: "Already a member" }, { status: 401 });
  }
  const sessionExisting = await prisma.purchases.findFirst({
    where: { userId, expiryDate: { gte: new Date() } },
  });
  if (sessionExisting) {
    return Response.json(
      { message: "already purchased membership" },
      { status: 400 }
    );
  }
  const user = await getUserData(userId)!;

  const primaryEmailId = user.primaryEmailAddressId;
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: "price_1K475oGTFNprTJMygonfn41h", quantity: 1 }],
    mode: "subscription",
    success_url: `${url.origin}/checkout/success?success=true&id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url.origin}/checkout/cancel?canceled=true`,
    automatic_tax: { enabled: true },
    customer_email: user.emailAddresses.find(
      (emailAddress) => emailAddress.id === primaryEmailId
    )!.emailAddress,
  });
  return Response.json({ redirect: session.url });
}
