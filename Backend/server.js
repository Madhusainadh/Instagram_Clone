import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import AuthRouter from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRouter.js"
import PostRoute from "./Routes/PostRoute.js"


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
// mongodb+srv://Instagram:<password>@cluster0.gvq45p0.mongodb.net/

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
    app.listen(process.env.PORT, () => {
      console.log(`port is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  //usage of routes

  app.use("/auth",AuthRouter)
  app.use("/user",UserRoute)
  app.use("/post",PostRoute)