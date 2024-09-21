"use server";
import {z} from 'zod';
import { api } from '../../../convex/_generated/api';
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from 'next/cache';

const createClientSchema = z.object({
    client_name: z.string(),
    industry: z.string(),
    website: z.string()
})


export async function createClientAction(prevState:unknown, formData:FormData) {

 const validatedData = createClientSchema.safeParse({
  client_name: formData.get('client_name') as string,
  industry: formData.get('industry') as string,
  website: formData.get('website') as string
 })

  if(!validatedData.success){
    return {
      status: 400,
      message: "Invalid data",
    }
  }

  const {clientId} = await fetchMutation(api.clients.createClient, {
     client_name: validatedData.data.client_name,
      industry: validatedData.data.industry,
      website: validatedData.data.website
  });


   revalidatePath(`/dashboard/clients/${clientId}`, "layout");
   revalidatePath('/dashboard', "layout")

  return {
    status: 200,
    message: "Client created successfully",
  }

}
