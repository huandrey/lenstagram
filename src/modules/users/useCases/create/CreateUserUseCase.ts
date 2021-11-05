import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    if (!name || !email || !password) {
      throw new AppError("All fields need to be filled!");
    }

    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    if (password.length < 8) {
      throw new AppError("Password must be at least 8 characters.");
    }

    const user = await this.userRepository.save({
      name,
      email,
      password: passwordHash,
    });

    delete user.password;

    return user;
  }
}
