import { Router, Request, Response } from "express";

const userRoutes = Router();

const users = [];

userRoutes.post("/user", (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  users.push({ name, email, password });
});

export { userRoutes };
