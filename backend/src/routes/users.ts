import { Router, Request, Response } from "express";
import prisma from "../db";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post("/users", async (req: Request, res: Response) => {
  try {
    const { object_number, name, email } = req.body;

    if (!object_number || !name || !email) {
      return res.status(400).json({ error: 'object_number, name, and email are required' });
    }

    const newUser = await prisma.user.create({
      data: {
        object_number,
        name,
        email,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


export default router;