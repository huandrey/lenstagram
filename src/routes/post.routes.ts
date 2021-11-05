import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "../modules/posts/useCases/create/CreatePostController";
import { DeletePostController } from "../modules/posts/useCases/delete/DeletePostController";
import { ListPostController } from "../modules/posts/useCases/list/ListPostController";
import { ListPostOfUserController } from "../modules/posts/useCases/listOfUser/ListPostOfUserController";
import { UpdatePostController } from "../modules/posts/useCases/update/UpdatePostController";

const postRoutes = Router();
const createPostUserController = new CreatePostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();
const listAllPostsOfUserController = new ListPostOfUserController();
const listAllPostsController = new ListPostController();

postRoutes.use(ensureAuthenticated);
postRoutes.post("/", createPostUserController.handle);
postRoutes.put("/:id", updatePostController.handle);
postRoutes.delete("/:id", deletePostController.handle);
postRoutes.get("/me", listAllPostsOfUserController.handle);
postRoutes.get("/", listAllPostsController.handle);

export { postRoutes };
