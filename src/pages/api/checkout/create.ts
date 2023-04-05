import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function checkoutCreate(req: any, res: NextApiResponse) {
    const { body } = req
    const {userId} = req.auth
    if(!userId){
        return res.status(401).json({message: "Already a member"})
    }
  
       const client = new PrismaClient();
       const sessionExisting = await client.purchases.findFirst({where: {userId, expiryDate:{gte: new Date()}}})
       if(sessionExisting){
        return res.status(400).json({message: "already purchased membership"})
       }
       const profile = await client.contacts.findFirstOrThrow({where: {userId, profile: true}})
    
    const session = await stripe.checkout.sessions.create({line_items: [
        {price: 'price_1MtKT9AQ0Pr8toHhHUEQjzwV' , quantity: 1}
    ], mode: "payment",        
        success_url: `${req.headers.origin}/checkout/success?success=true&id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout/cancel?canceled=true`,
    automatic_tax: {enabled: true},
    customer_email: profile.email

    })

    return res.json({redirect: session.url})

//   const client = new PrismaClient();
//   await client.contacts.create({data: {...body, display: body.profile ? body.display: true, userId}})
//   //await insertDirectoryData(body)
//   return res.status(200).json({ message: "inserted succesfully" })
}
export default withAuth(checkoutCreate)