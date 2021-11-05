// import { Request, Response } from "express";
// import { getRepository } from "typeorm";

// import { User } from "../entities/User";
// // import { UserRepository } from "../repositories/UsersRepository";
// // import { validateEmail } from "../utils/validations";

// export class UserController {
//   private userRepository = getRepository(User);

//   // async all(req: Request, res: Response) {}

//   async save(req: Request, res: Response) {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).send({
//         message: `All fields need to be filled!`,
//       });

//     const userAlreadyExists = await this.userRepository.findOne({ email });

//     if (userAlreadyExists)
//       return res.status(400).json({
//         message: "User already exists.",
//       });

//     if (password.length < 8)
//       return res.status(400).json({
//         message: "Password must be at least 8 characters.",
//       });

//     try {
//       const user = this.userRepository.create({
//         name,
//         email,
//         password,
//       });

//       return res.status(201).json({
//         message: "User successfully created",
//         data: user,
//       });
//     } catch (err) {
//       return res.status(400).send({
//         message: err.message || "Unexpected error.",
//       });
//     }
//   }
// }

// // export default () => {
// //   const userRepository = new UserRepository();
// //   return {
// //     create: async (req: Request, res: Response) => {
// //       const { name, email, password } = req.body;

// //       // const userRepository = getRepository(User);

// //       // const userAlreadyExists = await userRepository.findOne({ email });

// //       // const emptyFields = !name || !email || !password;
// //       try {
// //         const user = userRepository.create({
// //           name,
// //           email,
// //           password,
// //         });

// //         return res.status(201).json({
// //           message: "User successfully created",
// //           data: user,
// //         });
// //       } catch (err) {
// //         return res.status(400).send({
// //           message: err.message || "Unexpected error.",
// //         });
// //       }
// //       // const emailIsValid = validateEmail(email);

// //       // if (userAlreadyExists)
// //       //   return res.status(400).send({
// //       //     message: `User already exists!`,
// //       //   });

// //       // if (emptyFields)
// //       //   return res.status(400).send({
// //       //     message: `All fields need to be filled!`,
// //       //   });

// //       // if (!emailIsValid)
// //       //   return res.status(400).send({
// //       //     message: `Email is invalid`,
// //       //   });

// //       // if (password.length < 8)
// //       //   return res.status(400).send({
// //       //     message: `Password is invalid`,
// //       //   });

// //       // try {
// //       //   const user = await userRepository.save(user);
// //       //   return res.status(201).send({
// //       //     message: "User successfully created",
// //       //     data: user,
// //       //   });
// //       // } catch (err) {
// //       //   return res.status(500).send({
// //       //     message: err.message || "Unexpected error.",
// //       //   });
// //       // }
// //     },
// //     edit: async (req: Request, res: Response) => {
// //       const userRepository = getRepository(User);
// //       const { id } = req.params;
// //       const { name, email, password } = req.body;

// //       const userFound = await userRepository.findOne({ id });

// //       if (!userFound) {
// //         return res.status(500).send({
// //           message: "Something went wrong!",
// //         });
// //       }

// //       const userUpdated = {
// //         ...userFound,
// //         name: name || userFound.name,
// //         email: email || userFound.email,
// //         password: password || userFound.password,
// //       };

// //       try {
// //         const user = await userRepository.save(userUpdated);

// //         return res.status(201).json({
// //           message: "User successfully updated",
// //           data: user,
// //         });
// //       } catch (err) {
// //         return res.status(500).send({
// //           message: "Something went wrong.",
// //         });
// //       }
// //     },
// //     //   getAll: (req: Request, res: Response) => {
// //     //     const users = userRepository().list();

// //     //     if (!users) {
// //     //       return res.status(500).send({
// //     //         message: "Something went wrong!",
// //     //       });
// //     //     }

// //     //     return res.status(200).send({
// //     //       message: "Users successfully found!",
// //     //       data: users,
// //     //     });
// //     //   },

// //     //   login: (req: Request, res: Response) => {
// //     //     const { email, password } = req.body;

// //     //     const user = userRepository().findByEmail(email);

// //     //     if (!user)
// //     //       return res.status(404).send({
// //     //         auth: false,
// //     //         message: "User not found!",
// //     //       });

// //     //     const validation = userRepository().checkPermission(
// //     //       password,
// //     //       user.password
// //     //     );

// //     //     if (!validation)
// //     //       return res.status(401).send({
// //     //         auth: false,
// //     //         message: "Wrong password!",
// //     //       });

// //     //     return res.status(200).send({
// //     //       auth: true,
// //     //       // token,
// //     //       user,
// //     //     });
// //     //   },
// //     // };
// //   };
// // };
