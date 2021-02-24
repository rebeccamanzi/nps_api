import express, { request } from 'express';
import "./database";
import { router } from './routes';

const app = express();

// use -> middleware
app.use(express.json()); // permite trabalhar com json (ex: receber no body)
app.use(router);

app.listen(3333, () => console.log("Server is running!"));
