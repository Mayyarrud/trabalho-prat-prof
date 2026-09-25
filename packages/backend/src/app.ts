import fastify from "fastify";
import routes from "./routes/index.ts";
import plugins from "./plugins/index.ts";

export const app = fastify({
  logger: { level: "warn" },
  bodyLimit: 1024 * 20,
  routerOptions: { maxParamLength: 32 }
});

app.register(plugins);
app.register(routes);

process.on("SIGINT", async () => {
  await app.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await app.close();
  process.exit(0);
});