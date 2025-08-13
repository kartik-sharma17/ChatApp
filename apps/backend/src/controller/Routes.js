import express from 'express';
import { Login, Signup, FriendRequest, RequestResponse, GetFriend, GetRequest } from '../service/index.js';
import { VerifyToken } from '../middleware/index.js';

export const Route = express.Router();

Route.get('/', (req, res) => {
    res.send("server is runnnig");
})

Route.post('/auth/signup', Signup)
Route.post('/auth/login', Login)
Route.post('/friend-request', VerifyToken, FriendRequest)
Route.post('/friend-request/respond', VerifyToken, RequestResponse)
Route.get('/friends', VerifyToken, GetFriend)
Route.get('/request', VerifyToken, GetRequest)