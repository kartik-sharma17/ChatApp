import prisma from 'db';
import express from 'express'

const app = express();

app.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        console.log("this is a user stored in db = ", users)
        res.json({ users });
    } catch (error) {
        console.error("this is a error ==== ",error);
        res.status(500).json({ error: "Something went wrong" });
    }
})

app.listen(4000, () => { console.log("Server started successfully on 4000") })
