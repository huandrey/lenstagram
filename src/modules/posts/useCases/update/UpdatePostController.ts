import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UpdatePostUseCase } from "./UpdatePostUseCase";

export class UpdatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updatePostUseCase = container.resolve(UpdatePostUseCase);
    const { id } = request.params;
    const { description, url_img } = request.body;

    try {
      const post = await updatePostUseCase.execute({
        id,
        description,
        url_img,
      });

      return response.status(201).json({
        message: "Post successfully updated",
        data: post,
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
