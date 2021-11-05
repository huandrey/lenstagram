import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ListPostUseCase } from "./ListPostUseCase";

export class ListPostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPostUseCase = container.resolve(ListPostUseCase);

    try {
      const posts = await listPostUseCase.execute();

      return response.status(201).json({
        message: "Posts successfully listed",
        data: posts,
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
