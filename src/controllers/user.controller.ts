import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";
import { validateEmail } from "../utils/validations";

export default () => {
  return {
    create: async (req: Request, res: Response) => {
      const { name, email, password } = req.body;

      // const userAlreadyExists = userRepository().findByEmail(email);
      const userRepository = getRepository(User);

      const userAlreadyExists = await userRepository.findOne({ email });

      const emptyFields = !name || !email || !password;

      const emailIsValid = validateEmail(email);

      if (userAlreadyExists)
        return res.status(400).send({
          message: `User already exists!`,
        });

      if (emptyFields)
        return res.status(400).send({
          message: `All fields need to be filled!`,
        });

      if (!emailIsValid)
        return res.status(400).send({
          message: `Email is invalid`,
        });

      if (password.length < 8)
        return res.status(400).send({
          message: `Password is invalid`,
        });

      console.log(userAlreadyExists);

      const user = userRepository.create({
        name,
        email,
        password,
      });

      console.log(user);
      // console.log(user);
      await userRepository.save(user);

      return res.status(201).send({
        message: "User successfully created",
        data: user,
      });

      // return res.status(200).send({ msg: "ola" });
    },
    // edit: (req: Request, res: Response) => {
    //   const { id } = req.params;
    //   const { name, email, password } = req.body;

    //   const user = userRepository().editUser(id, { name, email, password });

    //   if (!user) {
    //     return res.status(500).send({
    //       message: "Something went wrong!",
    //     });
    //   }

    //   return res.status(200).send({
    //     message: "User successfully updated",
    //     data: user,
    //   });
    // },
    // getAll: (req: Request, res: Response) => {
    //   const users = userRepository().list();

    //   if (!users) {
    //     return res.status(500).send({
    //       message: "Something went wrong!",
    //     });
    //   }

    //   return res.status(200).send({
    //     message: "Users successfully found!",
    //     data: users,
    //   });
    // },

    // login: (req: Request, res: Response) => {
    //   const { email, password } = req.body;

    //   const user = userRepository().findByEmail(email);

    //   if (!user)
    //     return res.status(404).send({
    //       auth: false,
    //       message: "User not found!",
    //     });

    //   const validation = userRepository().checkPermission(
    //     password,
    //     user.password
    //   );

    //   if (!validation)
    //     return res.status(401).send({
    //       auth: false,
    //       message: "Wrong password!",
    //     });

    //   return res.status(200).send({
    //     auth: true,
    //     // token,
    //     user,
    //   });
    // },
  };
};
