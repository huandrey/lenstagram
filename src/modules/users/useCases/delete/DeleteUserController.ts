import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    const { id } = request.params;

    try {
      await deleteUserUseCase.execute(id);

      return response.status(200).json({
        message: "User successfully deleted",
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
