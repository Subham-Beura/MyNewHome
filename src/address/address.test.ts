import supertest from 'supertest';
import app from '..';

describe('GET /address/:addressId', () => {
  it('should respond with the requested address', async () => {
    const addressId = '327a98f3-44f2-41a2-933f-3dc30968e551'; // Replace with an actual address ID from your database

    const response = await supertest(app).get(`/address/${addressId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', addressId);
    // Add more assertions based on the structure of your Address type
  });

  it('should respond with 404 if the address is not found', async () => {
    const nonExistentAddressId = 'non-existent-address-id';

    const response = await supertest(app).get(`/address/${nonExistentAddressId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Address not found' });
  });
});