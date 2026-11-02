import type { FastifyInstance, FastifyReply } from "fastify";
import { surfLevels } from "../enums/surf-level.ts";
import {
  getMe,
  updateMe,
  setFavouriteBeach,
  removeFavouriteBeach,
  type ProfileResult,
  type ProfileUpdate,
} from "../services/me.ts";

const profileErrors = {
  profile_not_found: { status: 404, message: "Perfil não encontrado." },
  profile_forbidden: { status: 403, message: "Você não tem acesso a este perfil." },
  beach_not_found: { status: 404, message: "Praia não encontrada." },
};

function sendProfile(result: ProfileResult, reply: FastifyReply) {
  if ("profile" in result) return result.profile;

  const error = profileErrors[result.error];
  return reply.code(error.status).send({ message: error.message });
}

export default async function meRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", fastify.requireAuth);

  fastify.get("/", async (request, reply) => {
    const result = await getMe(request.authUser!);
    return sendProfile(result, reply);
  });

  fastify.patch<{ Body: ProfileUpdate }>("/", {
    schema: {
      body: {
        type: "object",
        additionalProperties: false,
        minProperties: 1,
        properties: {
          name: { type: "string", minLength: 1, maxLength: 100, pattern: "\\S" },
          surfLevel: { type: "string", enum: surfLevels },
        },
      },
    },
  }, async (request, reply) => {
    const result = await updateMe(request.authUser!, request.body);
    return sendProfile(result, reply);
  });

  fastify.put<{ Body: { beachId: string } }>("/favourite-beach", {
    schema: {
      body: {
        type: "object",
        additionalProperties: false,
        required: ["beachId"],
        properties: { beachId: { type: "string", format: "uuid" } },
      },
    },
  }, async (request, reply) => {
    const result = await setFavouriteBeach(request.authUser!, request.body.beachId);
    return sendProfile(result, reply);
  });

  fastify.delete("/favourite-beach", async (request, reply) => {
    const result = await removeFavouriteBeach(request.authUser!);
    return sendProfile(result, reply);
  });
}
