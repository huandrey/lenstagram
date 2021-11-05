import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { CreatePostUseCase } from "./CreatePostUseCase";

export class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createPostUseCase = container.resolve(CreatePostUseCase);
    const { description, url_img } = request.body;
    const { user_id } = request;

    try {
      const post = await createPostUseCase.execute({
        description,
        user_id,
        url_img,
      });

      return response.status(201).json({
        message: "Post successfully created",
        data: post,
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
