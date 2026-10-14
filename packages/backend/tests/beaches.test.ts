
import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import Fastify from "fastify";

import beachRoutes from "../src/routes/beaches.ts";
import {
  beachesCache,
  forecastsCache,
} from "../src/cache/data.ts";

const BEACH_ID = "11111111-1111-4111-8111-111111111111";
const FORECAST_ID = "22222222-2222-4222-8222-222222222222";

const app = Fastify();

app.register(beachRoutes, { prefix: "/beaches" });
await app.ready();

beforeEach(() => {
  const now = new Date();

  beachesCache.length = 0;
  forecastsCache.length = 0;

  beachesCache.push({
    id: BEACH_ID,
    name: "Maresias",
    ibgeCode: "3550704",
    latitude: -23.79,
    longitude: -45.55,
    createdAt: now,
    updatedAt: now,
    updatedBy: null,
  });

  forecastsCache.push({
    id: FORECAST_ID,
    idBeach: BEACH_ID,
    forecastTime: new Date("2026-10-15T12:00:00Z"),
    waveHeight: 1.5,
    wavePeriod: 12,
    waveDirection: 170,
    windSpeed: 8,
    windDirection: 110,
    temperature: 26,
    visibility: null,
    weatherCondition: "Ensolarado",
    surfScore: 80,
    createdAt: now,
    updatedAt: now,
    updatedBy: null,
  });
});


test("TST-001 - Consultar praia existente", async () => {
  const response = await app.inject({
    method: "GET",
    url: `/beaches/${BEACH_ID}`,
  });

  assert.equal(response.statusCode, 200);

  const data = response.json();

  assert.equal(data.name, "Maresias");
  assert.equal(data.forecast.length, 1);
  assert.equal(data.forecast[0].waveHeight, 1.5);
  assert.equal(data.forecast[0].wavePeriod, 12);
  assert.equal(data.forecast[0].temperature, 26);
});

test("TST-002 - Buscar praia pelo nome", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/beaches/?search=Maresias",
  });

  assert.equal(response.statusCode, 200);

  const data = response.json();

  assert.equal(data.length, 1);
  assert.equal(data[0].name, "Maresias");
});

test("TST-003 - Consultar índice de surfabilidade", async () => {
  const response = await app.inject({
    method: "GET",
    url: `/beaches/${BEACH_ID}`,
  });

  assert.equal(response.statusCode, 200);

  const data = response.json();

  assert.equal(data.forecast[0].surfScore, 80);
});

test("TST-004 - Rejeitar ID inválido", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/beaches/id-invalido",
  });

  assert.equal(response.statusCode, 400);

  const data = response.json();

  assert.equal(data.message, "ID inválido");
});

test("TST-005 - Praia inexistente", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/beaches/33333333-3333-4333-8333-333333333333",
  });

  assert.equal(response.statusCode, 404);

  const data = response.json();

  assert.equal(data.message, "Praia não encontrada");
});

after(async () => {
  await app.close();
});
