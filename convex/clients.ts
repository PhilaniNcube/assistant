import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createClient = mutation({
  args: {
    client_name: v.string(),
    industry: v.string(),
    website: v.string(),
  },
  handler: async (ctx, args) => {
    const clientId = await ctx.db.insert("clients", {
      client_name: args.client_name,
      industry: args.industry,
      website: args.website,
    })

    return {
      clientId,
    }
  }
})

export const getClient = query({
  args: {
    clientId: v.id("clients")
  },
  handler: async (ctx, args) => {
    const client = await ctx.db.get(args.clientId)

    return client
  }
})

export const getClients = query({
  handler: async (ctx) => {
    const clients = await ctx.db.query("clients").collect()

    return clients
  }
})
