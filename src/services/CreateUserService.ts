import { IUserRepository } from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  execute({ name, email, password }: IRequest): void {
    const userAlreadyExists = this.userRepository.findByEmail(email);

    const emptyFields = this.userRepository.someFieldIsEmpty({
      name,
      email,
      password,
    });

    if (userAlreadyExists) throw new Error("Category already exists!");
    if (emptyFields) throw new Error("All fields need to be filled!");

    this.userRepository.create({ name, email, password });
  }
}

export { CreateUserService };
