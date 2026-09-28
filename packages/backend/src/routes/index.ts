import healthRoutes from "./health.ts";
import beachRoutes from "./beaches.ts";
import type { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance) {
  fastify.register(healthRoutes);
  fastify.register(beachRoutes, { prefix: "/beaches" });
}