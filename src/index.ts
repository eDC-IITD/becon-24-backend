import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT|| 3001;

app.use(express.json());

app.post('/createUser', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

