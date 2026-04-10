import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});
//return a new function that Convex registers as a query.
//access: Combined with the file name, this becomes api.tasks.list
//pattern is api.<filename>.<exportName>.

//queries are reactive subscriptions
//if data changes, it automatically re-runs query and push results to clients
//for all functions use query

