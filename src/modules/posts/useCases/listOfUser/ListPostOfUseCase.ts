import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Post } from "../../entities/Post";
import { PostRepository } from "../../repositories/implementations/PostRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class ListPostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: PostRepository
  ) {}

  async execute(user_id: string): Promise<Post> {

    const posts = await this.postRepository.findAllPostsByUser(user_id);

    return posts;
  }
}
