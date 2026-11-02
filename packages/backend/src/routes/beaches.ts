import type { FastifyInstance } from "fastify";
import validator from "validator";
import { surfLevels, type SurfLevel } from "../enums/surf-level.ts";
import { getBeach, searchBeaches } from "../services/beaches.ts";

export default async function beachRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { search?: unknown } }>("/", async (request, reply) => {
    const { search } = request.query;

    if (search !== undefined && (typeof search !== "string" || search.length > 80)) {
      return reply.status(400).send({ message: "Busca inválida" });
    }

    return searchBeaches(search);
  });

  fastify.get<{
    Params: { id: string };
    Querystring: { surfLevel?: SurfLevel };
  }>("/:id", {
    schema: {
      querystring: {
        type: "object",
        properties: { surfLevel: { type: "string", enum: surfLevels } },
      },
    },
  }, async (request, reply) => {
    const { surfLevel } = request.query;
    const { id } = request.params;

    if (!validator.isUUID(id)) {
      return reply.status(400).send({
        message: "ID inválido",
      });
    }

    const beach = getBeach(id, surfLevel);

    if (!beach) {
      return reply.status(404).send({
        message: "Praia não encontrada",
      });
    }

    return beach;
  });
}
