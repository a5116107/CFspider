import { connect } from "cloudflare:sockets";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/__ping") {
      return new Response("pong", { status: 200 });
    }

    // Keep the `connect` symbol referenced so bundlers don't drop the import.
    if (typeof connect !== "function") {
      return new Response("cloudflare:sockets not available", { status: 500 });
    }

    return new Response("cloudflare:sockets import ok", { status: 200 });
  },
};
