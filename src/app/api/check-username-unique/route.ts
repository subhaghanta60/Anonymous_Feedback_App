import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {z} from "zod";
import { usernamevalidation } from "@/schemas/signupSchema";


const UsernameQuerySchema = z.object({
    username:usernamevalidation
})

export async function GET(request:Request){
   
    await dbConnect();
    
    try {
        const {searchParams} =  new URL(request.url)
        const queryParam ={
            username:searchParams.get('username')
        }
        //validate with Zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []

            return Response.json (
                {
                    success:false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(', '): 'Invalid Query Parameters',
                },
                {status:400}
            ) 
        }

        const {username} = result.data;
       const existingVerifiedUser = await UserModel.findOne({username,isValified:true});

       if(existingVerifiedUser){
        return Response.json (
            {
                success: false,
                message: "Username Already Exists"
            },
            {status:400}
        )

       }

       return Response.json (
        {
            success: true,
            message: "Username is Unique"
        },
        {status:500}
    )

        
    } catch (error) {
        console.error("Error Checking Username",error)
        return Response.json (
            {
                success:false,
                message:"Error Checking Username"
            },
            {status:500}
        )
    }
}

