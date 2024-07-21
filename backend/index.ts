import express from "express";
import cors from "cors";
import peopleController from "./src/people/peopleController";

const app = express();
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", peopleController);
app.use(express.json());
app.listen(8000);
