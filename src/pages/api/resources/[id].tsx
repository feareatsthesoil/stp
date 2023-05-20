import { withAuth } from "@clerk/nextjs/api";
import { prisma } from "../../../utils/prisma";
import { NextApiResponse } from "next";

async function resourceSubmit(req: any, res: NextApiResponse) {
    const { body } = req;
    const { userId } = req.auth;

    const { id } = req.query;
    const resource = await prisma.resource.findFirst({
        where: { id: Number(id) },
    });

    if (!resource) return res.status(404).json({ message: "Resource not found" });
    if (req.method === "PUT" || req.method === "DELETE") {
        if (resource.userId !== userId)
            return res.status(403).json({ message: "You are not authorized to edit this" });
        if (req.method === "PUT") {
            const { id, display, ...updateData } = body;
            await prisma.resource.update({
                where: { id: resource.id },
                data: { ...updateData },
            });
            return res.status(200).json(resource);
        } else {
            await prisma.resource.delete({ where: { id: resource.id } });
            return res.status(200).json({ message: "Deleted successfully" });
        }
    }
    res.status(200).json(resource);
}
export default withAuth(resourceSubmit);