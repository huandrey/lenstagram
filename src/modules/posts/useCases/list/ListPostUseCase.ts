import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Post } from "../../entities/Post";
import { PostRepository } from "../../repositories/implementations/PostRepository";

@injectable()
export class ListPostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: PostRepository
  ) {}

  async execute(): Promise<Post> {

    const posts = await this.postRepository.findAllPosts();

    return posts;
  }
}
