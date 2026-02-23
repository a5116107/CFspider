export { default } from "./破皮版workers.js";

// Compatibility shim: the existing `proxytt` Worker previously had a Durable Objects
// binding that required an exported class named `AuthStore`. Keeping this export
// avoids deploy errors if the binding still exists on the Worker.
export class AuthStore {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch() {
    return new Response("AuthStore is not implemented in this deployment.", {
      status: 501,
    });
  }
}

