import type { FastifyInstance } from "fastify";
import validator from "validator";

import {
  beachesCache,
  forecastsCache,
} from "../cache/data.ts";

import normalizeString from "../utils/normalize-string.ts";

export default async function beachRoutes(
  fastify: FastifyInstance,
) {
  fastify.get("/", async (request, reply) => {
    const { search } = request.query as {
      search?: unknown;
    };

    if (search === undefined) {
        return beachesCache;
    }

    if (typeof search !== "string") {
        return reply.status(400).send({
            message: "Busca inválida",
        });
    }

    if (search.length > 80) {
        return reply.status(400).send({
            message: "Busca inválida",
        });
    }

    const searchValue = normalizeString(search);

    return beachesCache.filter((beach) =>
        normalizeString(beach.name).includes(searchValue),
    );
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as {
      id: string;
    };

    if (!validator.isUUID(id)) {
      return reply.status(400).send({
        message: "ID inválido",
      });
    }

    const beach = beachesCache.find(
      (beach) => beach.id === id,
    );

    if (!beach) {
      return reply.status(404).send({
        message: "Praia não encontrada",
      });
    }

    const forecast = forecastsCache
      .filter((forecast) => forecast.idBeach === id)
      .sort(
        (a, b) =>
          a.forecastTime.getTime() -
          b.forecastTime.getTime(),
      );

    return {
      ...beach,
      forecast,
    };
  });
}
