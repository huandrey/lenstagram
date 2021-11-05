import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getUserUseCase = container.resolve(GetUserUseCase);

    const { id } = request.params;
    try {
      const users = await getUserUseCase.execute(id);

      return response.status(201).json({
        message: "Users successfully found!",
        data: users,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
