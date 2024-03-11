import { pgTable, unique, pgEnum, uuid, timestamp, varchar, boolean, foreignKey, bigint, doublePrecision } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const propertyClass = pgTable("property_class", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	type: varchar("type").notNull(),
},
(table) => {
	return {
		propertyClassIdKey: unique("property_class_id_key").on(table.id),
		propertyClassTypeKey: unique("property_class_type_key").on(table.type),
	}
});

export const user = pgTable("user", {
	emailId: varchar("email_id").primaryKey().notNull(),
	id: uuid("id").defaultRandom().notNull(),
	password: varchar("password"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	firstName: varchar("first_name"),
	middleName: varchar("middle_name"),
	lastName: varchar("last_name"),
	isAdmin: boolean("isAdmin").default(false),
	phoneNumber: varchar("phone_number"),
},
(table) => {
	return {
		userEmailIdKey: unique("user_email_id_key").on(table.emailId),
		userIdKey: unique("user_id_key").on(table.id),
	}
});

export const bhk = pgTable("bhk", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	bhk: varchar("bhk"),
});

export const propertyParams = pgTable("property_params", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	bhk: uuid("bhk").references(() => bhk.id, { onDelete: "set null", onUpdate: "cascade" } ),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bedroom: bigint("bedroom", { mode: "number" }).default(2),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bathroom: bigint("bathroom", { mode: "number" }).default(1),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	balcony: bigint("balcony", { mode: "number" }).default(0),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	hall: bigint("hall", { mode: "number" }).default(1),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	floors: bigint("floors", { mode: "number" }).default(1),
	area: doublePrecision("area"),
});

export const property = pgTable("property", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	seller: uuid("seller").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	propertyClass: uuid("property_class").references(() => propertyClass.id, { onDelete: "set null", onUpdate: "cascade" } ),
	address: uuid("address").references(() => address.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	params: uuid("params").references(() => propertyParams.id, { onDelete: "set null", onUpdate: "cascade" } ),
	amenities: uuid("amenities").references(() => amenities.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const amenities = pgTable("amenities", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	hospital: bigint("hospital", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	school: bigint("school", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	market: bigint("market", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	metro: bigint("metro", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	busStand: bigint("bus stand", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	railwayStation: bigint("railway station", { mode: "number" }),
});

export const propertyUserStarred = pgTable("property_user_starred", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	starredBy: uuid("starred_by").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	property: uuid("property").notNull().references(() => property.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const propertyImages = pgTable("property_images", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	imgLink: varchar("img_link"),
	property: uuid("property").references(() => property.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const address = pgTable("address", {
	longitude: doublePrecision("longitude"),
	lattitude: doublePrecision("lattitude"),
	unitNo: varchar("unit_no"),
	addressLine1: varchar("address_line_1"),
	addressLine2: varchar("address_line_2"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	pincode: bigint("pincode", { mode: "number" }),
	locality: uuid("locality").references(() => addressLocality.id, { onDelete: "set null", onUpdate: "cascade" } ),
	owner: uuid("owner").references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	id: uuid("id").defaultRandom().primaryKey().notNull(),
},
(table) => {
	return {
		addressIdKey: unique("address_id_key").on(table.id),
	}
});

export const addressLocality = pgTable("address_locality", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	locality: varchar("locality"),
	city: varchar("city"),
	state: varchar("state"),
	country: varchar("country"),
});