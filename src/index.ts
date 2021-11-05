import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";

import swagger from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "./shared/container";
import "./database";

const app = express();

app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: "Something went wrong!",
    });
  }
);

app.listen(3333, () => console.log("App is running on port 3333"));
