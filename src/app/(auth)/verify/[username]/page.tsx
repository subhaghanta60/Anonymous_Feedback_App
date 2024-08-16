'use client'
import { Form, FormField, FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"


import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useParams , useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { verifysSchema } from "@/schemas/verifiesSchema"


const VerifyAccount = () => {
    const router =useRouter()
    const param = useParams<{username:string}>()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof verifysSchema>>({
        resolver: zodResolver(verifysSchema),
        
      })
      
      
      const onSubmit = async (data: z.infer<typeof verifysSchema>) =>{
        try {
            const response = await axios.post(`/api/verify-code`, {
                username:param.username,
                code:data.code
            })
            toast({
                title:"Sucess",
                description: response.data.message
            })
            router.replace('sign-in')
            
        } catch (error) {
            console.error('Error during Verify:', error);

            const axiosError = error as AxiosError<ApiResponse>;

            // Default error m
            

            toast({
                title: 'Sign Up Failed',
                description: axiosError.response?.data.message,
                variant: 'destructive',
            });

            
        }

      }
        

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Ypur Account
                    </h1>
                    <p className="mb-4">Enter The Verification Code,Sent To Your Mail</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Verify Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Code" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default VerifyAccount