import { Router } from "express";
import {
  getAddressByAddressId,
  getAddressFromUserId,
  postAddressForUserId,
} from "./address.controller";

const addressRoutes = Router();

addressRoutes.get("/:addressId", getAddressByAddressId);
addressRoutes.get("/user/:userId", getAddressFromUserId);
addressRoutes.post("/user/:userId", postAddressForUserId);

export default addressRoutes;
