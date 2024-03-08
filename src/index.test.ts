import supertest from 'supertest';
import app from './index';

describe('GET /', () => {
  it('should respond with Hello World!', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});