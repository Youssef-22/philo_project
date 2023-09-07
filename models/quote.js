import { Schema,model,models } from "mongoose";

const quoteSchema = new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    quote:{
        type:String,
        required:[true,'quote is required'],
    },
    tag:{
        type:String,
        required:[true,'tag is required'],
    }
});

const quotee  = models.quote || model('quote', quoteSchema);
export default quotee;