import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clients: defineTable({
    client_name: v.string(),
    industry: v.string(),
    website: v.string(),
  }),
  campaigns: defineTable({
   campaign_name: v.string(),
    client_id: v.id("clients"),
    budget: v.number(),
    objective: v.string(),
    platform: v.string(),
    embeddings: v.array(v.number()),
  }),
  ads: defineTable({
    campaign_id: v.id("campaigns"),
    client_id: v.id("clients"),
    headline1: v.string(),
    headline2: v.string(),
    headline3: v.string(),
    description1: v.string(),
    description2: v.string(),
    description3: v.string(),
    budget: v.number(),
    keywords: v.array(v.string()),
    landing_page_url: v.optional(v.string()),
    embeddings: v.array(v.number()),
  }),
});
