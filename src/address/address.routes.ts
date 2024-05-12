import { Router } from "express";
import {
  getAddressByAddressId,
  getAddressFromUserId,
} from "./address.controller";

const addressRoutes = Router();

addressRoutes.get("/:addressId", getAddressByAddressId);
addressRoutes.get("/user/:userId", getAddressFromUserId);

export default addressRoutes;
