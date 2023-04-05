import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function checkoutCreate(req: any, res: NextApiResponse) {
    const { body } = req
    const {userId} = req.auth
    const session = await stripe.checkout.sessions.retrieve(req.body.id)
    if(session.status == "complete")
    {
        
   const client = new PrismaClient();

   const expiryDate = new Date()
   expiryDate.setFullYear(expiryDate.getFullYear() +1)
   const purchase = ( await client.purchases.findFirst({where: {stripeIntentId: session.id}}) ?? await client.purchases.create({data: {purchasePrice:session.amount_total/100, userId, expiryDate, stripeIntentId: session.id}}))
   
        return res.json({success: true, purchase})
    }
    

//   const client = new PrismaClient();
//   await client.contacts.create({data: {...body, display: body.profile ? body.display: true, userId}})
//   //await insertDirectoryData(body)
//   return res.status(200).json({ message: "inserted succesfully" })
}
export default withAuth(checkoutCreate)