export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Simple smoke test endpoint for CI/CD verification.
    if (url.pathname === "/__ping") {
      return new Response("pong", { status: 200 });
    }

    return new Response("ok", { status: 200 });
  },
};
