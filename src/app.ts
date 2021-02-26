import express from 'express';
import  createConnection from './database';
import { router } from './routes';

createConnection();
const app = express();

// use -> middleware
app.use(express.json()); // permite trabalhar com json (ex: receber no body)
app.use(router);

export { app };