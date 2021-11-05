import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { postRoutes } from "./post.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);

export { router };
