import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";


export async function POST(req: Request) {
  const {platform, details, objective} = await req.json();


  const prompt = `Generate ${platform} Ad copy suggestions for the following product or service: ${details}. Include compelling headlines, descriptions, a suggested budget, and relevant keywords. The obective for this advert will be: ${objective}`;

 const result = await generateObject({
   model: openai("gpt-4o-2024-08-06", {
     structuredOutputs: true,
   }),
   schemaName: "googleAdSchema",
   schemaDescription: "A suggestion for copy for a digital marketing ad",
   schema: z.object({
     headline1: z
       .string()
       .describe("The first headline of the ad shorter than 30 characters"),
     headline2: z
       .string()
       .describe("The second headline of the ad shorter than 30 characters"),
     headline3: z
       .string()
       .describe("The third headline of the ad shorter than 30 characters"),
     description1: z.string().describe("The first description of the ad"),
     description2: z.string().describe("The second description of the ad"),
     description3: z.string().describe("The third description of the ad"),
     //  budget: z.coerce.number(),
     keywords: z.array(z.string().describe('a keyword a phrase for the advert')).describe("Keywords for the ad"),
     //  landing_page_url: z.string().nullable(),
   }),
   prompt: prompt,
 });

 console.log(JSON.stringify(result.object, null, 2));


  return NextResponse.json(result.object);
}
