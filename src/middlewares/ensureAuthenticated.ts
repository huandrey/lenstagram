import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/users/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  verify(
    token,
    "c715d34197fa6ead42de60a743e3df8e",
    async (error: Error, decoded: IPayload) => {
      if (error) {
        throw new AppError("Invalid token!");
      }

      const userRepository = new UserRepository();
      const { sub: user_id } = decoded;
      const user = await userRepository.findById(user_id);

      if (!user) {
        throw new AppError("User does not exists!", 401);
      }

      request.user_id = user_id;
      next();
    }
  );
}
