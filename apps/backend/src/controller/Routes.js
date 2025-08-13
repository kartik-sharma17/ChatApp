import express from 'express';
import { Login, Signup,FriendRequest } from '../service/index.js';
import { VerifyToken } from '../middleware/index.js';

export const Route = express.Router();

Route.get('/', (req, res) => {
    res.send("server is runnnig");
})

Route.post('/auth/signup', Signup)
Route.post('/auth/login', Login)
Route.post('/friend-request', VerifyToken, FriendRequest)