import { prisma } from "@/utils/prisma";
import { getUserData } from "@/utils/userData";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return Response.json(
      {
        message: "Not logged in",
        isMember: false,
      },
      { status: 200 }
    );
  }

  const profile = await prisma.contacts.findFirst({
    where: { userId: userId ?? "Non existent user", profile: true },
  });
  const purchase = await prisma.purchases.findFirst({
    where: { userId: userId, expiryDate: { gte: new Date() } },
  });
  const user = await getUserData(userId);

  const isEdu = user?.emailAddresses.some((record) =>
    record.emailAddress.endsWith(".edu")
  );

  const isStp = user?.emailAddresses.some((record) =>
    record.emailAddress.endsWith("@stp.world")
  );

  return Response.json(
    {
      profile,
      purchase,
      message: "Queried succesfully",
      user: userId,
      isEdu,
      isSeedHolder: user?.unsafeMetadata.isSeedHolder,
      isMember: purchase || isEdu || isStp || user?.unsafeMetadata.isSeedHolder,
    },
    { status: 200 }
  );
}
