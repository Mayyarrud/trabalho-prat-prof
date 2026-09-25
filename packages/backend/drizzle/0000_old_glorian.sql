CREATE TABLE "beach" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"ibge_code" varchar(7) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "forecast" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_beach" uuid NOT NULL,
	"forecast_time" timestamp with time zone NOT NULL,
	"wave_height" real,
	"wave_period" real,
	"wave_direction" smallint,
	"wind_speed" real,
	"wind_direction" smallint,
	"temperature" real,
	"visibility" integer,
	"weather_condition" text,
	"surf_score" real,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text NOT NULL,
	"name" text NOT NULL,
	"surf_level" text,
	"id_favourite_beach" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "beach" ADD CONSTRAINT "beach_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "forecast" ADD CONSTRAINT "forecast_id_beach_beach_id_fk" FOREIGN KEY ("id_beach") REFERENCES "public"."beach"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "forecast" ADD CONSTRAINT "forecast_updated_by_user_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_favourite_beach_beach_id_fk" FOREIGN KEY ("id_favourite_beach") REFERENCES "public"."beach"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "beach_ibge_code_idx" ON "beach" USING btree ("ibge_code");--> statement-breakpoint
CREATE INDEX "beach_coordinates_idx" ON "beach" USING btree ("latitude","longitude");--> statement-breakpoint
CREATE INDEX "forecast_beach_idx" ON "forecast" USING btree ("id_beach");--> statement-breakpoint
CREATE INDEX "forecast_time_idx" ON "forecast" USING btree ("forecast_time");--> statement-breakpoint
CREATE UNIQUE INDEX "forecast_beach_time_unique" ON "forecast" USING btree ("id_beach","forecast_time");