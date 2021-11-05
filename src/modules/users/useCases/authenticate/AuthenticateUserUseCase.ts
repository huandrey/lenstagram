import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    const passwordMatch = await compare(password, user.password);

    if (!email || !password) {
      throw new AppError("All fields need to be filled!");
    }

    if (!user || !passwordMatch) {
      throw new AppError("Email or passowrd incorrect!");
    }
    const { id } = user;
    const token = sign({ id: String(id) }, "c715d34197fa6ead42de60a743e3df8e", {
      subject: String(id),
      expiresIn: "1d",
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}
