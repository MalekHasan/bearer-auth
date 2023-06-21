"use strict"
const {sequelize}=require("../src/auth/model/index")
const {app}=require("../src/server")
const supertest=require("supertest")
const request=supertest(app)

beforeAll(async () => {
    await sequelize.sync();
});

describe("Testing Server signup endpoint",()=>{
    test("Test Wrong path ",async ()=>{
       const result=await request.get("/sign");
       expect(result.status).toBe(404)
    })
    test("Test signup ",async ()=>{
        const result=await request.post("/signup").send({
            username: 'malek',
            password: '123'
        });
        expect(result.status).toBe(201);
     }); 
})




afterAll(async () => {
    await sequelize.drop();
});