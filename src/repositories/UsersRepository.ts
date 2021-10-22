/* eslint prefer-destructuring: 0 */
import { User } from "../model/User";
import { IUserRepository, ICreateUserDTO } from "./IUsersRepository";

class UserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({ name, email, password }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.users.push(user);

    return user;
  }

  list(): User[] {
    console.log(this.users.length);
    return this.users;
  }

  findByEmail(email: string): User {
    console.log(this.users.length);

    return this.users.find((user) => user.email === email);
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  someFieldIsEmpty({ name, email, password }: User): boolean {
    return !name || !email || !password;
  }

  editUser(id: string, data): User {
    const user = this.findById(id);

    const validation = this.checkPermission(data.password, user.password);

    if (!validation) {
      return null;
    }

    Object.entries(data).forEach((val) => {
      user[val[0]] = val[1];
    });

    user.updated_at = new Date();

    this.update(id, user);

    return user;
  }

  update(id: string, newUser: User): void {
    const newUsers = this.users.map((user) => user.id === id && newUser);

    this.users = newUsers;
  }

  checkPermission(password: string, userPassword: string): boolean {
    return password === userPassword;
  }
}

export { UserRepository };
