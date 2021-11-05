import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { DeletePostUseCase } from "./DeletePostUseCase";

export class DeletePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deletePostUseCase = container.resolve(DeletePostUseCase);
    const { id } = request.params;
    const { user_id } = request;

    try {
      const post = await deletePostUseCase.execute({ id, user_id });

      return response.status(201).json({
        message: "Post successfully deleted",
        data: post,
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
