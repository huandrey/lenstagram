import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ msg: "opa" });
});

app.listen(8080, () => console.log("App is running on port 8080"));
