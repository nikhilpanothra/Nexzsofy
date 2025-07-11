import {StreamChat} from 'stream-chat'
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET
 
if (!apiKey || !apiSecret){
   console.error("Stream API key or Secret is missing") 
}
const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData)=>{
    try {
        if(!userData.id){
            throw new Error('User Id is required in userData')
        }
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
     console.error("Error upserting Stream user:",error)
    }
}
export const generateStreamToken = (userId)=>{
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
         console.error("Error in generating Stream Token", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
};



