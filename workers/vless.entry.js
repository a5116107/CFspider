function getDebugKey(env) {
  return env.ACCESSKEY || env.ACCESS_KEY || env.AKEY || "";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Debug: verify the deployed script is active.
    if (url.pathname === "/__ping") {
      return new Response("pong", { status: 200 });
    }

    try {
      const mod = await import("./peel_workers.js");
      const peelWorker = mod?.default;
      if (!peelWorker || typeof peelWorker.fetch !== "function") {
        throw new Error("Invalid peel worker module: missing default.fetch()");
      }
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
