import { Router } from "express";

const propertyRoutes = Router();

// For debugging. Will not be in prod
propertyRoutes.get("/", getAllProperty);
//Actual Feed. Will get Filters
propertyRoutes.get("/:pincode", getPropertyFromPincode);

//Detail of a singleProperty
propertyRoutes.get("/:property", getProperty);
