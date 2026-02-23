export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/__ping") {
      return new Response("pong", { status: 200 });
    }

    return new Response("ok", { status: 200 });
  },
};
