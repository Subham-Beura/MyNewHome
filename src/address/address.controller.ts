import { Request, Response } from "express";
import { Address } from "./address.type";
import {
  getAddressFromDatabase,
  getUserAllAddressFromDatabase,
  createAddressForUserId,
} from "./address.service";
import { user } from "../drizzle/schema";

export type AddressOrError = {
  address: Address | undefined;
  error: Error | undefined;
};
export type AddressesOrError = {
  addresses: Address[] | undefined;
  error: Error | undefined;
};
export const getAddressByAddressId = async (req: Request, res: Response) => {
  const addressId = req.params.addressId;

  // Assuming you have a function to fetch the address from the database
  const requestedAddress: AddressOrError = await getAddressFromDatabase(
    addressId
  );
  if (!requestedAddress.error) {
    res.status(200).json(requestedAddress.address);
  } else {
    res.status(404).json({ error: "Address not found" });
  }
};
export const getAddressFromUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // Assuming you have a function to fetch the address from the database based on the user ID
  const requestedAddress: AddressesOrError =
    await getUserAllAddressFromDatabase(userId);
  if (!requestedAddress.error) {
    res.status(200).json(requestedAddress.addresses);
  } else {
    res.status(404).json({ error: requestedAddress.error.message });
  }
};
export const postAddressForUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const address: Address = req.body;
  if (!address) {
    res.status(400).json({ error: "Address details are required" });
    return;
  }
  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  // Assuming you have a function to create a new address for the user in the database
  const createdAddress: AddressOrError = await createAddressForUserId(
    userId,
    address
  );

  if (!createdAddress.error) {
    res.status(201).json(createdAddress.address);
  } else {
    res.status(500).json({ error: createdAddress.error.message });
  }
};
