import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from:'',
            to:email,
            subject:'FeedBack | Verification Code',
            react: VerificationEmail({username,otp:verifyCode}),
        });

        return {success:true,message:' Verification Email Sent Successflly'}
        
    } catch (emailError) {
        console.error("Error Sending Verification Email",emailError)
        return {success:false,message:'Failed To Sent Verification Email'}
        
    }
}

