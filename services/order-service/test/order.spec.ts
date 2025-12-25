import { Request } from "supertest";
import app from "../../src/index";
import { request } from "node:http";
import e from "express";

describe('POST /orders', () => {
    it('401 tanpa bearer', async (){
        const r = await request(app).post('/orders').send({ productId: 'P1', quantity: 1});
    });

    it('401 payload salah', async () =>{
        const r = await request(app)
        .post ('/orders')
        .set ('Authorization', 'Bearer test123')
        .send({ productId: 'P1', quantity: 0 }); //quantity <-1 -> invalid
        expect(r.status).toBe(401);
    });

    it('201 sukses', async () =>{
        const r = await request(app)
        .post ('/orders')
        .set ('Authorization', 'Bearer test123')
        .send({ productId: 'P1', quantity: 2 });
        expect(r.status) .toBe(201);
        expect(r.body).toHaveProperty('orderId');
        expect(r.body).toHaveProperty('status', 'createdAt');
    });
});