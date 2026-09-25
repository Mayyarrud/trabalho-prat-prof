FROM ghcr.io/pnpm/pnpm:12.6.0@sha256:a7181e1d2a2e3ac5dad5a776a7e27360b0e24b59db4de8949569197e4d4036d1

ENV PNPM_CONFIG_GLOBAL_SHIMS='{"node":false}'

RUN pnpm runtime set node 24.21.0 -g

WORKDIR /app

COPY --chmod=644 package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chmod=644 packages/backend/package.json ./packages/backend/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install \
    --prod \
    --frozen-lockfile \
    --filter @vai-dar-onda/backend...

RUN apt-get update \
    && apt-get install -y --no-install-recommends adduser \
    && addgroup --system backend \
    && adduser \
        --system \
        --ingroup backend \
        --home /app \
        --no-create-home \
        --shell /usr/sbin/nologin \
        backend \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=backend:backend packages/backend/src ./packages/backend/src

RUN chown -R backend:backend /app \
    && chmod -R u+rwX,go+rX /app

USER backend

WORKDIR /app/packages/backend

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "src/server.ts"]
