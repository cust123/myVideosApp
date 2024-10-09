// require("dotenv").config({ path: "./env" });

// import mongoose from "mongoose";
// import { DB_NAME } from "constants.js";

import dotevn from "dotenv";
import connectDB from "./db/index.js";

dotevn.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening on PORT: ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("MongoDB connection FAILD !!!", error);
  });

/*
import express from "express";

const app = express()(async () => {
  try {
    const myDbConnection = await mongoose.connect(
      `${process.env.MONGODB_URI}/ ${DB_NAME}`
    );
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is Listening on Port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR", error);
    throw err;
  }
})();

*/
