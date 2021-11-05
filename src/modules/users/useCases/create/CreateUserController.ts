import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { name, email, password } = request.body;

    try {
      const user = await createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).json({
        message: "User successfully created!",
        data: user,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
