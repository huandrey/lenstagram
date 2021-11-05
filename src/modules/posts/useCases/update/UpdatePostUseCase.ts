import { inject, injectable } from "tsyringe";

import { Post } from "../../entities/Post";
import { PostRepository } from "../../repositories/implementations/PostRepository";

interface IRequest {
  id: string;
  description: string;
  url_img: string;
}

@injectable()
export class UpdatePostUseCase {
  constructor(
    @inject("PostRepository")
    private postRepository: PostRepository
  ) {}

  async execute({ id, description, url_img }: IRequest): Promise<Post> {
    const post = await this.postRepository.update({
      id,
      description,
      url_img,
    });

    return post;
  }
}
