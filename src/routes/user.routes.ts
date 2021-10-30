import { Router } from "express";

import * as controller from "../controllers/user.controller";

const userRoutes = Router();
const userController = controller.default();

userRoutes.post("/", (req, res) => {
  userController.create(req, res);
});

// userRoutes.get("/", (req, res) => {
//   const allUsers = userController.getAll(req, res);
//   return res.json(allUsers);
// });

// userRoutes.put("/:id", (req, res) => {
//   userController.edit(req, res);
// });

// userRoutes.post("/login", (req, res) => {
//   userController.login(req, res);
// });

export { userRoutes };
