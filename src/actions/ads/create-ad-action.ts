"use server";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { Id } from "../../../convex/_generated/dataModel";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

const createAdSchema = z.object({
  client_id: z.string(),
  campaign_id: z.string(),
  headline1: z.string(),
  headline2: z.string(),
  headline3: z.string(),
  description1: z.string(),
  description2: z.string(),
  description3: z.string(),
  budget: z.coerce.number(),
  keywords: z.array(z.string()),
  landing_page_url: z.string().optional(),
});

export async function createAdAction(prevState:unknown, formData:FormData) {

  const validatedData = createAdSchema.safeParse({
    client_id: formData.get("client_id") as string,
    campaign_id: formData.get("campaign_id") as string,
    headline1: formData.get("headline1") as string,
    headline2: formData.get("headline2") as string,
    headline3: formData.get("headline3") as string,
    description1: formData.get("description1") as string,
    description2: formData.get("description2") as string,
    description3: formData.get("description3") as string,
    budget: Number(formData.get("budget")),
    keywords: (formData.get("keywords") as string).split(","),
    landing_page_url: formData.get("landing_page_url") as string,
  });

    if (!validatedData.success) {
      return {
        status: 400,
        message: "Invalid data",
      };
    }

  const clientId = formData.get("client_id") as Id<"clients">;
  const campaignId = formData.get("campaign_id") as Id<"campaigns">;

    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: `Headline1:${validatedData.data.headline1}; Headline2:${validatedData.data.headline2} ; Headline3:${validatedData.data.headline3}; Headline3:${validatedData.data.headline3}; Description1:${validatedData.data.description1}; Description2:${validatedData.data.description2}; Description3:${validatedData.data.description3}; Keywords:${validatedData.data.keywords.join(",")}; Budget:${validatedData.data.budget}; Landing Page URL:${validatedData.data.landing_page_url}`,
    });

    console.log(embedding, "embedding", clientId, campaignId);

    const data = await fetchMutation(api.ads.createAd, {
      client_id: clientId,
      campaign_id: campaignId,
      headline1: validatedData.data.headline1,
      headline2: validatedData.data.headline2,
      headline3: validatedData.data.headline3,
      description1: validatedData.data.description1,
      description2: validatedData.data.description2,
      description3: validatedData.data.description3,
      budget: validatedData.data.budget,
      keywords: validatedData.data.keywords,
      landing_page_url: validatedData.data.landing_page_url,
      embeddings: embedding,
    });

    console.log(data);

    revalidatePath(`/dashboard/clients/${clientId}`, "layout");
    revalidatePath("/dashboard", "layout");

    return {
      status: 200,
      message: "Ad created successfully",
    };

}
