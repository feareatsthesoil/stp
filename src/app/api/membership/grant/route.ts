import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const { userId } = getAuth(req);
  if (!userId)
    return Response.json({ message: "Not logged in." }, { status: 401 });

  if (code !== process.env.ACCESS_MEMBERSHIP_CODE) {
    return Response.json({ message: "Code is invalid." }, { status: 403 });
  }
  if (
    !process.env.ACCESS_MEMBERSHIP_CODE ||
    process.env.ACCESS_MEMBERSHIP_CODE?.trim() === ""
  ) {
    return Response.json({ message: "Option not available." }, { status: 403 });
  }

  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  await prisma.purchases.create({
    data: {
      purchasePrice: -1,
      stripeIntentId: "",
      userId,
      expiryDate: date,
    },
  });
  Response.json({ message: "Successfully purchased" });
}
