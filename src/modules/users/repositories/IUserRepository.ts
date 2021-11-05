import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

interface IUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password: string;
}

interface IUserRepository {
  save({ name, email, password }): Promise<User>;
  listAll(): Promise<User[]>;
  get(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update({ id, name, email, password }): Promise<User>;
  delete(id: string): Promise<void>;
  someFieldIsEmpty(user: User): boolean;
}

export { IUserRepository, ICreateUserDTO, IUpdateUserDTO };
