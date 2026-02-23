export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/__ping") {
      return new Response("pong", { status: 200 });
    }

    try {
      const mod = await import("cloudflare:sockets");
      const connect = mod?.connect;
      return new Response(`connect:${typeof connect}`, { status: 200 });
    } catch (err) {
      const details =
        err && typeof err === "object" ? err.stack || err.message || String(err) : String(err);

      return new Response(`sockets import failed: ${details}`, { status: 500 });
    }
  },
};
