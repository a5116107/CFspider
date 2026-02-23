export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/__ping") {
      return new Response("pong", { status: 200 });
    }

    const expected = env.ACCESSKEY || env.ACCESS_KEY || env.AKEY || "";
    const provided = request.headers.get("x-cfspider-debug") || "";
    const canDebug = Boolean(expected) && provided === expected;

    try {
      const mod = await import("./破皮版workers.js");
      const worker = mod?.default;
      if (!worker || typeof worker.fetch !== "function") {
        throw new Error("Invalid VLESS worker module: missing default.fetch().");
      }

      return await worker.fetch(request, env, ctx);
    } catch (err) {
      const details =
        err && typeof err === "object" ? err.stack || err.message || String(err) : String(err);

      return new Response(
        canDebug ? details : "Worker threw exception. Check Cloudflare logs.",
        { status: 500 },
      );
    }
  },
};
