import request from 'supertest';
import app from './../index';

describe('GET /testing', () => {
  it('should return "Hello, World!"', async () => {
    const response = await request(app).get('/testing');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});
