"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressLocality = exports.address = exports.propertyImages = exports.propertyUserStarred = exports.amenities = exports.property = exports.propertyParams = exports.bhk = exports.user = exports.propertyClass = exports.codeChallengeMethod = exports.aalLevel = exports.factorStatus = exports.factorType = exports.keyType = exports.keyStatus = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.keyStatus = (0, pg_core_1.pgEnum)("key_status", ['default', 'valid', 'invalid', 'expired']);
exports.keyType = (0, pg_core_1.pgEnum)("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20']);
exports.factorType = (0, pg_core_1.pgEnum)("factor_type", ['totp', 'webauthn']);
exports.factorStatus = (0, pg_core_1.pgEnum)("factor_status", ['unverified', 'verified']);
exports.aalLevel = (0, pg_core_1.pgEnum)("aal_level", ['aal1', 'aal2', 'aal3']);
exports.codeChallengeMethod = (0, pg_core_1.pgEnum)("code_challenge_method", ['s256', 'plain']);
exports.propertyClass = (0, pg_core_1.pgTable)("property_class", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    type: (0, pg_core_1.varchar)("type").notNull(),
}, function (table) {
    return {
        propertyClassIdKey: (0, pg_core_1.unique)("property_class_id_key").on(table.id),
        propertyClassTypeKey: (0, pg_core_1.unique)("property_class_type_key").on(table.type),
    };
});
exports.user = (0, pg_core_1.pgTable)("user", {
    emailId: (0, pg_core_1.varchar)("email_id").primaryKey().notNull(),
    id: (0, pg_core_1.uuid)("id").defaultRandom().notNull(),
    password: (0, pg_core_1.varchar)("password"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    firstName: (0, pg_core_1.varchar)("first_name"),
    middleName: (0, pg_core_1.varchar)("middle_name"),
    lastName: (0, pg_core_1.varchar)("last_name"),
    isAdmin: (0, pg_core_1.boolean)("isAdmin").default(false),
    phoneNumber: (0, pg_core_1.varchar)("phone_number"),
}, function (table) {
    return {
        userEmailIdKey: (0, pg_core_1.unique)("user_email_id_key").on(table.emailId),
        userIdKey: (0, pg_core_1.unique)("user_id_key").on(table.id),
    };
});
exports.bhk = (0, pg_core_1.pgTable)("bhk", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    bhk: (0, pg_core_1.varchar)("bhk"),
});
exports.propertyParams = (0, pg_core_1.pgTable)("property_params", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    bhk: (0, pg_core_1.uuid)("bhk").references(function () { return exports.bhk.id; }, { onDelete: "set null", onUpdate: "cascade" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    bedroom: (0, pg_core_1.bigint)("bedroom", { mode: "number" }).default(2),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    bathroom: (0, pg_core_1.bigint)("bathroom", { mode: "number" }).default(1),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    balcony: (0, pg_core_1.bigint)("balcony", { mode: "number" }).default(0),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    hall: (0, pg_core_1.bigint)("hall", { mode: "number" }).default(1),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    floors: (0, pg_core_1.bigint)("floors", { mode: "number" }).default(1),
    area: (0, pg_core_1.doublePrecision)("area"),
});
exports.property = (0, pg_core_1.pgTable)("property", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    seller: (0, pg_core_1.uuid)("seller").references(function () { return exports.user.id; }, { onDelete: "cascade", onUpdate: "cascade" }),
    propertyClass: (0, pg_core_1.uuid)("property_class").references(function () { return exports.propertyClass.id; }, { onDelete: "set null", onUpdate: "cascade" }),
    address: (0, pg_core_1.uuid)("address").references(function () { return exports.address.id; }, { onDelete: "cascade", onUpdate: "cascade" }),
    params: (0, pg_core_1.uuid)("params").references(function () { return exports.propertyParams.id; }, { onDelete: "set null", onUpdate: "cascade" }),
    amenities: (0, pg_core_1.uuid)("amenities").references(function () { return exports.amenities.id; }, { onDelete: "restrict", onUpdate: "cascade" }),
});
exports.amenities = (0, pg_core_1.pgTable)("amenities", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    hospital: (0, pg_core_1.bigint)("hospital", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    school: (0, pg_core_1.bigint)("school", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    market: (0, pg_core_1.bigint)("market", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    metro: (0, pg_core_1.bigint)("metro", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    busStand: (0, pg_core_1.bigint)("bus stand", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    railwayStation: (0, pg_core_1.bigint)("railway station", { mode: "number" }),
});
exports.propertyUserStarred = (0, pg_core_1.pgTable)("property_user_starred", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    starredBy: (0, pg_core_1.uuid)("starred_by").notNull().references(function () { return exports.user.id; }, { onDelete: "cascade", onUpdate: "cascade" }),
    property: (0, pg_core_1.uuid)("property").notNull().references(function () { return exports.property.id; }, { onDelete: "cascade", onUpdate: "cascade" }),
});
exports.propertyImages = (0, pg_core_1.pgTable)("property_images", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    imgLink: (0, pg_core_1.varchar)("img_link"),
    property: (0, pg_core_1.uuid)("property").references(function () { return exports.property.id; }, { onDelete: "cascade", onUpdate: "cascade" }),
});
exports.address = (0, pg_core_1.pgTable)("address", {
    longitude: (0, pg_core_1.doublePrecision)("longitude"),
    lattitude: (0, pg_core_1.doublePrecision)("lattitude"),
    unitNo: (0, pg_core_1.varchar)("unit_no"),
    addressLine1: (0, pg_core_1.varchar)("address_line_1"),
    addressLine2: (0, pg_core_1.varchar)("address_line_2"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    pincode: (0, pg_core_1.bigint)("pincode", { mode: "number" }),
    locality: (0, pg_core_1.uuid)("locality").references(function () { return exports.addressLocality.id; }, { onDelete: "set null", onUpdate: "cascade" }),
    owner: (0, pg_core_1.uuid)("owner").references(function () { return exports.user.id; }, { onDelete: "cascade", onUpdate: "cascade" }),
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
}, function (table) {
    return {
        addressIdKey: (0, pg_core_1.unique)("address_id_key").on(table.id),
    };
});
exports.addressLocality = (0, pg_core_1.pgTable)("address_locality", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    locality: (0, pg_core_1.varchar)("locality"),
    city: (0, pg_core_1.varchar)("city"),
    state: (0, pg_core_1.varchar)("state"),
    country: (0, pg_core_1.varchar)("country"),
});
