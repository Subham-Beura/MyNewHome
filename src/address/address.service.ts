import { eq } from "drizzle-orm";
import { address } from "../drizzle/schema";
import { Address } from "./address.type";
import { db } from "..";
import { AddressesOrError, AddressOrError } from "./address.controller";

export const getAddressFromDatabase = async (
  addressId: string
): Promise<AddressOrError> => {
  try {
    const requestedAddress: Address[] | undefined = await db
      .selectDistinct()
      .from(address)
      .where(eq(address.id, addressId));
    if (!requestedAddress) throw new Error("Address not found");

    return { address: requestedAddress[0], error: undefined };
  } catch (error: any) {
    return { address: undefined, error: error };
  }
};
export const getUserAllAddressFromDatabase = async (
  userId: string
): Promise<AddressesOrError> => {
  try {
    const addresses: Address[] | undefined = await db
      .selectDistinct()
      .from(address)
      .where(eq(address.owner, userId));
    if (!addresses || addresses.length == 0)
      throw new Error("No Address for this user");
    return { addresses, error: undefined };
  } catch (error: any) {
    return { addresses: undefined, error };
  }
};
export const createAddressForUserId = async (
  userId: string,
  newAddress: Address
): Promise<AddressOrError> => {
  try {
    const [createdAddress]: Address[] = await db
      .insert(address)
      .values({ ...newAddress, owner: userId })
      .returning();
    return { address: createdAddress, error: undefined };
  } catch (error: any) {
    return { address: undefined, error };
  }
};
