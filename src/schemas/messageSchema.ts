import {z} from 'zod'

export const messageSchema = z.object({
    content:z
    .string()
    .min(10, {message: 'Content Must be al least Of 10 Charactors'})
    .max(300,{message: 'Content Must be No longer Than 300 charactors'})
            
})