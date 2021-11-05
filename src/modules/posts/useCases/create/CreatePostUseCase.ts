import { inject, injectable } from "tsyringe";

import { Post } from "../../entities/Post";
import { PostRepository } from "../../repositories/implementations/PostRepository";

interface IRequest {
  description: string;
  user_id: string;
  url_img: string;
}

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: PostRepository
  ) {}

  async execute({ description, user_id, url_img }: IRequest): Promise<Post> {
    if (!url_img) {
      throw new Error("Image is required!");
    }

    const post = await this.postRepository.store({
      description,
      user_id,
      url_img,
    });

    return post;
  }
}
