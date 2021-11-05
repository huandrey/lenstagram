import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Post } from "../../entities/Post";
import { PostRepository } from "../../repositories/implementations/PostRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DeletePostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: PostRepository
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Post> {
    const postAlreadyExists = await this.postRepository.findPostById(id);

    if (!postAlreadyExists) {
      throw new AppError("Post not found!");
    }

    if (postAlreadyExists.user_id !== user_id) {
      throw new AppError("You can only delete your posts!");
    }

    await this.postRepository.delete(id);

    return postAlreadyExists;
  }
}
