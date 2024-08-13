import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import {Message} from "@/models/User";

export async function POST(request:Request) {
    await dbConnect();

   const {username,content} = await request.json();
   try {
    const user = await UserModel.findOne({username})

    if(!user){
        return Response.json (
            {
                success:false,
                message:"User Not Found"
            },
            {status:404}
        )
    }
    //Is user accepting The Messages

    if(!user.isAcceptingMessage){
        return Response.json (
            {
                success:false,
                message:"User Not accepting Messages"
            },
            {status:403}
        )  
    }

    const newMessage = {content,createdAt: new Date()}
     user.messages.push(newMessage as Message);
     await user.save();
     return Response.json (
        {
            success:true,
            message:"Message Sent Successfully"
        },
        {status:403}
    ) 

    
   } catch (error) {
    return Response.json (
        {
            success:false,
            message:"Unaccepted Error"
        },
        {status:500}
    )  
    
   }
}