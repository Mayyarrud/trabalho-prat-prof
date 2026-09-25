import type { FastifyInstance } from "fastify";
export default async function health(fastify: FastifyInstance) {
  const app = fastify
  app.get(
    "/health",
    async (req, res) => {
      res.status(200).send({ status: "ok" });
    }
  );
}
