import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import helmet from "./helmet.ts";
import cors from "./cors.ts";
import auth from "./auth.ts";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  await Promise.all([
    fastify.register(helmet),
    fastify.register(cors),
    fastify.register(auth)
  ]);
});