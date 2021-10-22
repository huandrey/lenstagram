import { User } from "../model/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

interface IUserRepository {
  create({ name, email, password }): void;
  list(): User[];
  findByEmail(email: string): User;
  someFieldIsEmpty(user: User): boolean;
}

export { IUserRepository, ICreateUserDTO };
