import mongoose from "mongoose";
import { EnvVariables } from "./env";

export const dbconfig = async (MONGO_URI: string) => {
  try {
    await mongoose.connect(
      `${EnvVariables.MONGO_URI}/${EnvVariables.DATABASE_NAME}`
    );
    console.log(
      `✅ Successfully connected to MongoDB ${
        EnvVariables.NODE_ENV === "development"
          ? `(${EnvVariables.DATABASE_NAME})`
          : ""
      }`
    );
  } catch (error) {
    console.log("ERROR WHILE CONNECTING TO DB");
    console.log(error);
  }
};
