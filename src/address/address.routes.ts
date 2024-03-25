import { warn } from "console";
import { Router } from "express";
import { getAddressByAddressId } from "./address.controller";

const addressRoutes = Router();

addressRoutes.get("/:addressId", getAddressByAddressId);

export default addressRoutes;
