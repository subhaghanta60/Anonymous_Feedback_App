import {z} from 'zod'

export const verifysSchema = z.object({
    code:z.string().length(6,'Verfication Code Must Be Six Digit')
})