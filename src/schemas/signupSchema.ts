import {z} from 'zod'

export const usernamevalidation = z
        .string()
        .min(2, "Username must be atleast Two Charactor")
        .max(20,"Username must be no more than 20 characters")
        


export const signUpSchema = z.object({
    username:usernamevalidation,
    email:z.string().email({message:"Invalid Email Address"}),
    password: z.string().min(6,{message:'Password Must be atleast 6 charactors'}).max(20,{message:'Password Must be within 20 charactors'})

    

})

//.regex(/^[a-zA-A0-9_]+$/, "Username must not contain Special Character")