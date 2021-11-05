import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const { id } = request.params;
    const { name, email, password } = request.body;
    try {
      const user = await updateUserUseCase.execute({
        id,
        name,
        email,
        password,
      });

      return response.status(201).json({
        message: "Users successfully updated!",
        data: user,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
