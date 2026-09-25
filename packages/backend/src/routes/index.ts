import healthRoutes from "./health.ts";
import type { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance) {
  fastify.register(healthRoutes);
}