import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const authenticateUserController = container.resolve(
      AuthenticateUserUseCase
    );
    const { email, password } = request.body;

    try {
      const auth = await authenticateUserController.execute({
        email,
        password,
      });

      return response.status(200).json({
        message: "User successfully authenticated!",
        data: auth,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
}
