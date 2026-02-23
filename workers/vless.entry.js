import peelWorker from "./peel_workers.js";

function getDebugKey(env) {
  return env.ACCESSKEY || env.ACCESS_KEY || env.AKEY || "";
}

export default {
  async fetch(request, env, ctx) {
    try {
      return await peelWorker.fetch(request, env, ctx);
    } catch (err) {
      const expected = getDebugKey(env);
      const provided = request.headers.get("x-cfspider-debug") || "";
      const details = err && typeof err === "object" ? (err.stack || err.message || String(err)) : String(err);

      if (expected && provided === expected) {
        return new Response(details, { status: 500 });
      }

      return new Response("Worker threw exception. Check Cloudflare logs.", { status: 500 });
    }
  },
};
