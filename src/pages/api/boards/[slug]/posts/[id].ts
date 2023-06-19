import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/prisma";

export default async function postGet(req: NextApiRequest, res: NextApiResponse){


    const data = await prisma.post.findFirstOrThrow({
        where: {id: Number(req.query.id)}},
       )


       console.log({data})
    return res.status(200).json(data)
}