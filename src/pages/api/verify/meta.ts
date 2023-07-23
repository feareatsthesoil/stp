import { NextApiResponse } from "next";
import { withAuth, clerkClient } from "@clerk/nextjs/api";
import { prisma } from "../../../utils/prisma";

async function meta(req: any, res: NextApiResponse) {
  const { userId } = req.auth;
  if (!userId) return res.status(401).json({ message: "Not logged in" });
  const profile = await prisma.contacts.findFirst({
    where: { userId: userId ?? "Non existent user", profile: true },
  });
  const purchase = await prisma.purchases.findFirst({
    where: { userId: userId, expiryDate: { gte: new Date() } },
  });
  const user = await clerkClient.users.getUser(userId);

  const isEdu = user.emailAddresses.some((record) =>
    record.emailAddress.endsWith(".edu")
  );

  const isStp = user.emailAddresses.some((record) =>
    record.emailAddress.endsWith("@stp.world")
  );

  return res.status(200).json({
    profile,
    purchase,
    message: "Queried succesfully",
    user: userId,
    isEdu,
    isSeedHolder: user.unsafeMetadata.isSeedHolder,
    isMember: purchase || isEdu || isStp || user.unsafeMetadata.isSeedHolder,
  });
}
export default withAuth(meta);