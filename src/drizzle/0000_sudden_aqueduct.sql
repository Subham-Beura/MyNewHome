-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_class" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"type" varchar NOT NULL,
	CONSTRAINT "property_class_id_key" UNIQUE("id"),
	CONSTRAINT "property_class_type_key" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"email_id" varchar PRIMARY KEY NOT NULL,
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"password" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"first_name" varchar,
	"middle_name" varchar,
	"last_name" varchar,
	"isAdmin" boolean DEFAULT false,
	"phone_number" varchar,
	CONSTRAINT "user_email_id_key" UNIQUE("email_id"),
	CONSTRAINT "user_id_key" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bhk" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bhk" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_params" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bhk" uuid,
	"bedroom" bigint DEFAULT 2,
	"bathroom" bigint DEFAULT 1,
	"balcony" bigint DEFAULT 0,
	"hall" bigint DEFAULT 1,
	"floors" bigint DEFAULT 1,
	"area" double precision
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"seller" uuid,
	"property_class" uuid,
	"address" uuid,
	"params" uuid,
	"amenities" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "amenities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hospital" bigint,
	"school" bigint,
	"market" bigint,
	"metro" bigint,
	"bus stand" bigint,
	"railway station" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_user_starred" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"starred_by" uuid NOT NULL,
	"property" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"img_link" varchar,
	"property" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"longitude" double precision,
	"lattitude" double precision,
	"unit_no" varchar,
	"address_line_1" varchar,
	"address_line_2" varchar,
	"pincode" bigint,
	"locality" uuid,
	"owner" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT "address_id_key" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address_locality" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"locality" varchar,
	"city" varchar,
	"state" varchar,
	"country" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_params" ADD CONSTRAINT "public_property_params_bhk_fkey" FOREIGN KEY ("bhk") REFERENCES "public"."bhk"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "public_property_address_fkey" FOREIGN KEY ("address") REFERENCES "public"."address"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "public_property_amenities_fkey" FOREIGN KEY ("amenities") REFERENCES "public"."amenities"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "public_property_params_fkey" FOREIGN KEY ("params") REFERENCES "public"."property_params"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "public_property_property_class_fkey" FOREIGN KEY ("property_class") REFERENCES "public"."property_class"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property" ADD CONSTRAINT "public_property_seller_fkey" FOREIGN KEY ("seller") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_user_starred" ADD CONSTRAINT "public_property_user_starred_property_fkey" FOREIGN KEY ("property") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_user_starred" ADD CONSTRAINT "public_property_user_starred_starred_by_fkey" FOREIGN KEY ("starred_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_images" ADD CONSTRAINT "public_property_images_property_fkey" FOREIGN KEY ("property") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "public_address_locality_fkey" FOREIGN KEY ("locality") REFERENCES "public"."address_locality"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "public_address_owner_fkey" FOREIGN KEY ("owner") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/