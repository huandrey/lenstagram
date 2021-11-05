import { container } from "tsyringe";

import { PostRepository } from "../../modules/posts/repositories/implementations/PostRepository";
import { IPostRepository } from "../../modules/posts/repositories/IPostRepository";
import { UserRepository } from "../../modules/users/repositories/implementations/UserRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IPostRepository>("PostRepository", PostRepository);
