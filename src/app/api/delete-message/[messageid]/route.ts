import { getServerSession } from "next-auth";
import { authOptions } from "../../sign-up/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {User} from "next-auth";
import mongoose from "mongoose";

export async function DELETE(request:Request,{params}:{params:{messageid:string}}){
    const messageID = params.messageid;
    await dbConnect()

    const session = await getServerSession(authOptions);
    const user: User= session?.user as User

    if(!session || !session.user){
        return Response.json (
            {
                success:false,
                message:"Not Authenticated "
            },
            {status:401}
        )

    }

    try {
       const updateResult =  await UserModel.updateOne(
            {_id:user._id},
            {$pull:{messages:{_id:messageID}}}
        )
        if(updateResult.modifiedCount ==0){
            return Response.json (
                {
                    success:false,
                    message:"Message Not already Deleted"
                },
                {status:404}
            )
        }
        return Response.json (
            {
                success:true,
                message:"Message Deleted Successfully "
            },
            {status:401}
        )
        
    } catch (error) {
        return Response.json (
            {
                success:false,
                message:"Error while Deleting Message"
            },
            {status:500}
        )
        
    }
    

}