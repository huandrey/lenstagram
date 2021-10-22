import express from "express";
import swagger from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));
app.use(router);

app.get("/", (req, res) => {
  res.json({ msg: "opa" });
});

app.listen(8080, () => console.log("App is running on port 8080"));
