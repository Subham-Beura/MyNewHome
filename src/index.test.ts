import supertest from "supertest";
import app from "./index";
describe("Server Works", () => {
  const testingServer=app.listen(4000);
  describe("GET /", () => {
    it("should respond with Hello World!", async () => {
      const response = await supertest(app).get("/");
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World!");
    });
  });
  afterEach(async()=>{
     testingServer.close();
  })
});
