import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/prisma";
import { withAuth } from "@clerk/clerk-sdk-node";

async function getComments  (req: NextApiRequest & {auth: {userId: string}}, res: NextApiResponse){
    const { id, page } = req.query;
    const post =  await prisma.post.findFirstOrThrow({
        where: {id: Number(id) }
    })

    const pageNum = Number(page) || 1
    if(req.method === "GET"){
        const count = await prisma.comment.count({
            where: {postId: post.id },
            orderBy: { createdAt: "desc" },

        })
        res.setHeader("total-records", count.toString())
        res.setHeader("total-pages", (count/10).toString())
        res.setHeader("current-page", (pageNum).toString())

        const data = await prisma.comment.findMany({
            where: {postId: post.id },
            take: 10, 
            skip: (pageNum - 1) * 10,
            orderBy: { createdAt: "desc" },

        })

        return res.status(200).json(data)
    }
    else if(req.method=== "POST"){

        const { userId } = req.auth;
        const {body} = req
        if (!userId) return res.status(401).json({ message: "Not logged in" });

        await prisma.comment.create({data: {...body, userId, postId: post.id }})
        return res.status(201).json({message: "Created"})

    }
}

export default withAuth(getComments)