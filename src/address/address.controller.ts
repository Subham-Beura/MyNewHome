import { Request, Response } from "express";
import { Address } from "./address.type";
import { getAddressFromDatabase } from "./address.service";

type AddressOrError = {
  address: Address | undefined;
  error: Error | undefined;
};
export const getAddressByAddressId = async (req: Request, res: Response) => {
  const addressId = req.params.addressId;

  // Assuming you have a function to fetch the address from the database
  const requestedAddress: AddressOrError =
    await getAddressFromDatabase(addressId);
  if (!requestedAddress.error) {
    res.status(200).json(requestedAddress.address);
  } else {
    res.status(404).json({ error: "Address not found" });
  }
};
