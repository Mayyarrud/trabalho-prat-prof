import type { FastifyInstance } from "fastify";
import fastifyHelmet from "@fastify/helmet";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(
  async (fastify: FastifyInstance) => {
    fastify.register(fastifyHelmet);
  },
  {
    name: "helmet",
  }
);