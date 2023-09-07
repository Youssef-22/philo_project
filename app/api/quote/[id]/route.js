import quotee from "@models/quote"
import { connectToDb } from "@utils/database"

export const GET = async (req, {params}) => {
    try {
        await connectToDb();
        const quote = await quotee.findById(params.id).populate('creator');
        if(!quote)  return new Response('Quote not Found',{status: 404});

        return new Response(JSON.stringify(quote),{status: 200});
    } catch (error) {
        return new Response('failed to fetchQuotes',{status: 500});
    }
}

export const PATCH = async (req,{params}) =>{
    const {quote,tag} = await req.json();
    try {
        await connectToDb();
        const existingQuote = await quotee.findById(params.id);
        if(!existingQuote)  return new Response('Quote not Found',{status: 404});
        existingQuote.quote = quote;
        existingQuote.tag = tag;
        await existingQuote.save();
        return new Response(JSON.stringify(existingQuote),{status: 200});
    } catch (error) {
        return new Response('failed to update the Quote',{status: 500});
    }
}

export const DELETE = async (res,{params})=>{
    try {
        await connectToDb();
        const quoteToDelete = await quotee.findByIdAndRemove(params.id);
       return new Response("quote deleted successfully ",{status:200});
    } catch (error) {
        return new Response('failed to Delete the Quote',{status: 500});
    }
}