import supertest from "supertest";
import app from "..";
import { Address } from "./address.type";

describe("GET /address/:addressId", () => {
  it("should respond with the requested address", async () => {
    const addressId = "327a98f3-44f2-41a2-933f-3dc30968e551"; // Replace with an actual address ID from your database

    const response = await supertest(app).get(`/address/${addressId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", addressId);
    // Add more assertions based on the structure of your Address type
  });

  it("should respond with 404 if the address is not found", async () => {
    const nonExistentAddressId = "non-existent-address-id";

    const response = await supertest(app).get(
      `/address/${nonExistentAddressId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Address not found" });
  });
});
describe("GET /address/user/:userId", () => {
  it("should respond with all addresses for a given user ID", async () => {
    const userId = "703fe06c-1136-4a45-b927-f3769bb5f26f"; // Replace with an actual user ID from your database

    const response = await supertest(app).get(`/address/user/${userId}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // Check that each item in the response is an object with an 'address' property
    response.body.forEach((item: Address) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("owner", userId);
    });
  });

  it("should respond with an error if no addresses are found for the user ID", async () => {
    const nonExistentUserId = "non-existent-user-id";

    const response = await supertest(app).get(
      `/address/user/${nonExistentUserId}`,
    );

    expect(response.status).toBe(404);
  });
});
