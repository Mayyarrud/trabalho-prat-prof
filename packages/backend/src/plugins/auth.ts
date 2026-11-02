import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getAuthUser, type AuthUser } from "../lib/auth.ts";

function unauthorized(reply: FastifyReply) {
  return reply
    .code(401)
    .header("WWW-Authenticate", "Bearer")
    .send({ message: "Sessão inválida ou expirada. Entre novamente." });
}

export default fastifyPlugin(async (fastify) => {
  fastify.decorateRequest("authUser", null);
  fastify.decorate("requireAuth", async (request, reply) => {
    reply.header("Cache-Control", "no-store");

    const token = request.headers.authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];
    if (!token) return unauthorized(reply);

    const user = await getAuthUser(token);
    if (!user) return unauthorized(reply);

    request.authUser = user;
  });
}, { name: "auth" });

declare module "fastify" {
  interface FastifyRequest {
    authUser: AuthUser | null;
  }

  interface FastifyInstance {
    requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void>;
  }
}
