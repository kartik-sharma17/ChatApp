import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import { serverSocket } from './config/index.js';

dotenv.config()

const app = express();
const server = http.createServer(app);

app.use('/', (req, res) => { res.send("ws is running") })

serverSocket(server)

const port = process.env.PORT
server.listen(port, () => { console.log("Web Socket is Started at Port = ", port) })