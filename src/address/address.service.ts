import { eq } from "drizzle-orm";
import { address } from "../drizzle/schema";
import { Address } from "./address.type";
import { db } from "..";

// Function to fetch the address from the database
export const getAddressFromDatabase = async (
  addressId: string,
): Promise<{ address: Address | undefined; error: Error | undefined }> => {
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
