import {
  doublePrecision,
  index,
  integer,
  pgTable,
  real,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),

  role: text("role").notNull(),
  name: text("name").notNull(),

  surfLevel: text("surf_level"),

  idFavouriteBeach: uuid("id_favourite_beach").references(
    (): AnyPgColumn => beaches.id,
    {
      onDelete: "set null",
      onUpdate: "cascade",
    },
  ),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),

  deletedAt: timestamp("deleted_at", {
    withTimezone: true,
  }),
});

export const beaches = pgTable(
  "beach",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),

    ibgeCode: varchar("ibge_code", {
      length: 7,
    }).notNull(),

    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),

    updatedBy: uuid("updated_by").references(
      (): AnyPgColumn => users.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),
  },
  (table) => [
    index("beach_ibge_code_idx").on(table.ibgeCode),

    index("beach_coordinates_idx").on(
      table.latitude,
      table.longitude,
    ),
  ],
);

export const forecasts = pgTable(
  "forecast",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    idBeach: uuid("id_beach")
      .notNull()
      .references(() => beaches.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    forecastTime: timestamp("forecast_time", {
      withTimezone: true,
    }).notNull(),

    waveHeight: real("wave_height"),
    wavePeriod: real("wave_period"),
    waveDirection: smallint("wave_direction"),

    windSpeed: real("wind_speed"),
    windDirection: smallint("wind_direction"),

    temperature: real("temperature"),
    visibility: integer("visibility"),

    weatherCondition: text("weather_condition"),

    surfScore: real("surf_score"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),

    updatedBy: uuid("updated_by").references(() => users.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
  },
  (table) => [
    index("forecast_beach_idx").on(table.idBeach),

    index("forecast_time_idx").on(table.forecastTime),

    uniqueIndex("forecast_beach_time_unique").on(
      table.idBeach,
      table.forecastTime,
    ),
  ],
);