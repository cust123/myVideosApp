import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/ ${DB_NAME}`
    );
    console.log(connectionInstance);

    console.log(
      `DB connection is established !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILD", error);
    process.exit(1);
    // throw error;
  }
};

export default connectDB;
