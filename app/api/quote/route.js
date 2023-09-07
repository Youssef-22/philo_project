import quotee from "@models/quote"
import { connectToDb } from "@utils/database"

export const GET = async (req, res) => {
    try {
        await connectToDb();
        const quotes = await quotee.find({}).populate('creator');
        return new Response(JSON.stringify(quotes),{status: 200});
    } catch (error) {
        return new Response('failed to fetchQuotes',{status: 500});
    }
}