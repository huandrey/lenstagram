// /* eslint prefer-destructuring: 0 */
// import { getRepository, Repository } from "typeorm";

// import { User } from "../entities/User";
// import { IUserRepository, ICreateUserDTO } from "./IUsersRepository";

// class UserRepository implements IUserRepository {
//   private repository: Repository<User>;

//   constructor() {
//     this.repository = getRepository(User);
//   }

//   async create({ name, email, password }: ICreateUserDTO): Promise<User> {
//     const user = this.repository.create({
//       name,
//       email,
//       password,
//     });

//     await this.repository.save(user);

//     return user;
//   }

//   async list(): Promise<User[]> {
//     const users = await this.repository.find();
//     return users;
//   }

//   async findByEmail(email: string): Promise<User> {
//     const user = this.repository.findOne({ email });

//     return user;
//   }

//   async findById(id: string): Promise<User> {
//     const user = this.repository.findOne({ id });

//     return user;
//   }

//   someFieldIsEmpty({ name, email, password }: User): boolean {
//     return !name || !email || !password;
//   }

//   editUser(id: string, data): Promise<User> {
//     const user = this.findById(id);

//     const validation = this.checkPermission(data.password, user.password);

//     if (!validation) {
//       return null;
//     }

//     Object.entries(data).forEach((val) => {
//       user[val[0]] = val[1];
//     });

//     // user.updated_at = new Date();

//     // this.update(id, user);

//     return user;
//   }

//   update(id: string, newUser: User): void {
//     // const newUsers = this.users.map((user) => user.id === id && newUser);
//     // this.users = newUsers;
//   }

//   checkPermission(password: string, userPassword: string): boolean {
//     return password === userPassword;
//   }
// }

// export { UserRepository };
