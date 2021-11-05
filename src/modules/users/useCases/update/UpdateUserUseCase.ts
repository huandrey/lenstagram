import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = await this.userRepository.update({
      id,
      name,
      email,
      password,
    });

    return user;
  }
}
