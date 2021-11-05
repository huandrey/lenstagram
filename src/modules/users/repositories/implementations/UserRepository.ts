import { compare } from "bcryptjs";
import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import {
  IUserRepository,
  ICreateUserDTO,
  IUpdateUserDTO,
} from "../IUserRepository";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  private static INSTANCE: UserRepository;

  constructor() {
    this.repository = getRepository(User);
  }

  async save({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });
    const userSaved = await this.repository.save(user);

    return userSaved;
  }
  listAll(): Promise<User[]> {
    const users = this.repository.find();
    return users;
  }

  get(id: string): Promise<User> {
    const user = this.repository.findOne(id);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      select: ["id", "name", "email", "password"],
      where: {
        email,
      },
    });
    return user;
  }

  async update({ id, name, email, password }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.findOne({
      select: ["id", "name", "email", "password"],
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Password is invalid!", 401);
    }

    const updatedUserData = {
      ...user,
      name: name || user.name,
      email: email || user.email,
    };

    const updatedUser = this.repository.create(updatedUserData);

    await this.repository.save(updatedUser);

    return updatedUser;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.findOne(id);

    return user;
  }
  someFieldIsEmpty(user: User): boolean {
    throw new AppError("Method not implemented.");
  }
}
