import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);
    try {
      const users = await listUsersUseCase.execute();

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
