import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCampaign = mutation({
  args: {
    campaign_name: v.string(),
    client_id: v.id("clients"),
    budget: v.number(),
    objective: v.string(),
    platform: v.union(v.literal("Facebook"), v.literal("Instagram"), v.literal("LinkedIn"), v.literal("Google Ads")),
    embeddings: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const campaignId = await ctx.db.insert("campaigns", {
      campaign_name: args.campaign_name,
      client_id: args.client_id,
      budget: args.budget,
      objective: args.objective,
      platform: args.platform,
      embeddings: args.embeddings,
    })

    return {
      campaignId,
    }
  }
});


export const getCampaign = query({
  args: {
    campaignId: v.id("campaigns")
  },
  handler: async (ctx, args) => {
    const campaign = await ctx.db.get(args.campaignId)

    return campaign
  }
})

export const getCampaigns = query({
  handler: async (ctx) => {
    const campaigns = await ctx.db.query("campaigns").collect()

    return campaigns
  }
})
