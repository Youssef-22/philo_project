import quotee from "@models/quote"
import { connectToDb } from "@utils/database"

export const GET = async (req, {params}) => {
    try { 
        await connectToDb();
        const quotes = await quotee.find({creator:params.id}).populate('creator');
        return new Response(JSON.stringify(quotes),{status: 200});
    } catch (error) {
        return new Response('failed to fetchQuotes',{status: 500});
    }
}