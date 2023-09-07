import { connectToDb } from "@utils/database";

import quotee from "@models/quote";

export const POST = async (req)=>{
    const {userId,quote,tag} =  await req.json();
    try {
        await connectToDb();
        const newQuote = new quotee({creator:userId,quote,tag});
        await newQuote.save();
        return new Response(JSON.stringify(newQuote),{status:201})
    } catch (error) {
        return new Response('failed to create the Quote',{status:500});
    }
}