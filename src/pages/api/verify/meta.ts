import { withAuth } from "@clerk/nextjs/api";
import { NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { getUserData } from "../../../utils/userData";

async function meta(req: any, res: NextApiResponse) {
  const { userId } = req.auth;

  if (!userId) {
    return res.status(200).json({
      message: "Not logged in",
      isMember: false,
    });
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

  return res.status(200).json({
    profile,
    purchase,
    message: "Queried succesfully",
    user: userId,
    isEdu,
    isSeedHolder: user?.unsafeMetadata.isSeedHolder,
    isMember: purchase || isEdu || isStp || user?.unsafeMetadata.isSeedHolder,
  });
}
export default withAuth(meta);
