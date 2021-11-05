import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/useCases/create/CreateUserController";
import { DeleteUserController } from "../modules/users/useCases/delete/DeleteUserController";
import { GetUserController } from "../modules/users/useCases/get/GetUserController";
import { ListUsersController } from "../modules/users/useCases/list/ListUsersController";
import { UpdateUserController } from "../modules/users/useCases/update/UpdateUserController";

const userRoutes = Router();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const getUserController = new GetUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.use(ensureAuthenticated);
userRoutes.get("/", listUsersController.handle);
userRoutes.get("/:id", getUserController.handle);
userRoutes.put("/:id", updateUserController.handle);
userRoutes.delete("/:id", deleteUserController.handle);

export { userRoutes };
