import {z} from 'zod'

export const verifySchema = z.object({
    code:z.string().length(6,'Verfication Code Must Be Six Digit')
})