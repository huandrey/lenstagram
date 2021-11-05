import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ListPostUseCase } from "./ListPostOfUseCase";

export class ListPostOfUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPostUseCase = container.resolve(ListPostUseCase);
    const { user_id } = request;

    try {
      const posts = await listPostUseCase.execute(user_id);

      return response.status(201).json({
        message: "Posts successfully listed",
        data: posts,
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
