"use server";
import {  z } from "zod";
import { api } from "../../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { Id } from "../../../convex/_generated/dataModel";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

const createCampaignSchema = z.object({
  client_id: z.string(),
  campaign_name: z.string(),
  budget: z.coerce.number(),
  objective: z.string(),
  platform: z.enum(["Facebook", "Instagram", "LinkedIn", "Google Ads"]),
});

export async function createCampaignAction(prevState: unknown, formData: FormData) {
  const validatedData = createCampaignSchema.safeParse({
    client_id: formData.get("client_id") as string,
    campaign_name: formData.get("campaign_name") as string,
    budget: Number(formData.get("budget")),
    objective: formData.get("objective") as string,
    platform: formData.get("platform") as string,
  });

  if (!validatedData.success) {
    return {
      status: 400,
      message: "Invalid data",
    };
  }

  const clientId = formData.get("client_id") as Id<"clients">;

  const { embedding } = await embed({
    model: openai.embedding("text-embedding-3-small"),
    value: `Campaign Name:${validatedData.data.campaign_name}; Objective:${validatedData.data.objective}; Platform:${validatedData.data.platform}; Budget:${validatedData.data.budget}`,
  });

  const data = await fetchMutation(api.campaigns.createCampaign, {
    client_id: clientId,
    campaign_name: validatedData.data.campaign_name,
    budget: validatedData.data.budget,
    objective: validatedData.data.objective,
    platform: validatedData.data.platform,
    embeddings: embedding,
  });

  console.log(data);

  revalidatePath(`/dashboard/clients/${clientId}`, "layout");
  revalidatePath("/dashboard", "layout");

  return {
    status: 200,
    message: "Client created successfully",
  };
}
