import express from "express";
import cors from "cors";
import route from "./routes/Route.js";
import mongoose from "mongoose";
import { user } from "./details/id_pw.js";

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});

const db_name = user.db_name;
const user_password = user.password;
const db_url = `mongodb+srv://neeraj:${user_password}@cluster0.y15mz.mongodb.net/${db_name}?retryWrites=true&w=majority`;

mongoose
  .connect(db_url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log("Not Connected"));

app.use(route);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
