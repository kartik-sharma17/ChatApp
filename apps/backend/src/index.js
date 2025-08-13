import express from 'express'
import dotenv from 'dotenv'
import { Route } from './controller/index.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/', Route);

const port = process.env.PORT
app.listen(port, console.log("Server Successfully started on port = ", port));
