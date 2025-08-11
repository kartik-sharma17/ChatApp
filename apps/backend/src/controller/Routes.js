import express from 'express';
import { Login, Signup } from '../service/index.js';

export const Route = express.Router();

Route.get('/', (req, res) => {
    res.send("server is runnnig");
})

Route.post('/auth/signup', Signup)
Route.post('/auth/login', Login)