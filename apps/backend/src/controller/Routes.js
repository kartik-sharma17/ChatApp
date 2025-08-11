import express from 'express';
import { Signup } from '../service/index.js';

export const Route = express.Router();

Route.get('/', (req, res) => {
    res.send("server is runnnig");
})

Route.post('/auth/signup', Signup)