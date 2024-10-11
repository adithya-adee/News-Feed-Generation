/* eslint-disable @typescript-eslint/no-require-imports */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  keyword: { type: [String], default: [] },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
