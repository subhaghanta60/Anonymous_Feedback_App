import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request){
    await dbConnect();
    try {
         const {username,email,password} = await request.json();

        const existingUserVerifiedByUsername =await UserModel.findOne({
            username,
            isVerified:true
         })

         if(existingUserVerifiedByUsername){
            return Response.json({
                sucess:false,
                message: "Username is already Taken"
            }, {status:400})
         }

         const existingUserByemail =await UserModel.findOne({
            email
         })
         const verifyCode = Math.floor(100000 + Math.random()*900000).toString()

         if(existingUserByemail){
            if(existingUserByemail.isVerified){
                return Response.json({
                    sucess:false,
                    message: "User Already Exists With This email"
    
                },{status:400})

            }else {
                const hasePassword =  await bcrypt.hash(password,10)
                existingUserByemail.password = hasePassword;
                existingUserByemail.verifyCode = verifyCode;
                existingUserByemail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByemail.save();
            }
            
         }else {
            const hasePassword =  await bcrypt.hash(password,10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1)

           const newUser = new UserModel({
                username,
                email,
                password: hasePassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified : false,
                isAcceptingMessage: true,
                messages: []

            })
            await newUser.save()
         }

         //Sent Verification Email

         const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
         )

         if(!emailResponse.success){
            return Response.json({
                sucess:false,
                message: emailResponse.message

            },{status:500})
         }
         return Response.json({
            sucess:true,
            message: "User Registration Suceesfully.Please Verify Your Email"

        },{status:201})



    }catch(error){
        console.error('Error Registration User',error)
        return Response.json(
            {
                success:false,
                message:"Error Registering User"
            },
            {
                status:500
            }
        )
    }
}
