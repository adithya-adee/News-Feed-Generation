/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// creating user Schema
// const user = require("./userSchema");

dotenv.config("../.env");

const MONGO_URL = process.env.DATABASE_URL;
if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined in the environment variables.");
}

const connectionStat = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URL);

    //created user
    // const newUser = new user({
    //   userId: "12345",
    //   email: "example@example.com",
    //   name: "John Doe",
    //   keywords: ["technology", "football", "music"],
    // });
    // await newUser.save();

    console.log("MongoDB connected successfully");
    return connection;
  } catch (err) {
    console.log("Error connecting to mongoose", err);
  }
};

module.exports = connectionStat;
