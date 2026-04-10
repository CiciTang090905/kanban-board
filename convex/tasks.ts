import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

//mutations are for changing data, they don't return data to clients, so no need to return anything.
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },// validates these at runtime, so if the client sends a number instead of a string, the mutation fails with a clear error.
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", { //insert new document
      title: args.title,
      description: args.description,
      status: "todo",
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("tasks"), //ensure valid id for tasks table
    status: v.union(
      v.literal("todo"),
      v.literal("in-progress"),
      v.literal("done"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status }); //ctx.db.patch(id, fields), partial update for specified fields
  },
});

export const remove = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

//return a new function that Convex registers as a query.
//access: Combined with the file name, this becomes api.tasks.list
//pattern is api.<filename>.<exportName>.

//queries are reactive subscriptions
//if data changes, it automatically re-runs query and push results to clients
//for all functions use query

//query, patch, delete, insert

//mutations are transactional --> atomic transaction