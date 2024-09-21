import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAd = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const adId = await ctx.db.insert("ads", {
      campaign_id: args.campaign_id,
      client_id: args.client_id,
      headline1: args.headline1,
      headline2: args.headline2,
      headline3: args.headline3,
      description1: args.description1,
      description2: args.description2,
      description3: args.description3,
      keywords: args.keywords,
      budget: args.budget,
      landing_page_url: args.landing_page_url,
      embeddings: args.embeddings,
    })

    return {
      adId,
    }
  }
})


export const getAds = query({
  handler: async (ctx) => {
    const ads = await ctx.db.query("ads").collect();

    return ads;
  },
});

export const getAd = query({
  args: {
    adId: v.id("ads"),
  },
  handler: async (ctx, args) => {
    const ad = await ctx.db.get(args.adId);

    return ad;
  },
});
