import express from 'express';

const app = express();
app.use(express.json());

//Belum ada route dan middleware (sengaja agar tes RED dulu)

export default app;