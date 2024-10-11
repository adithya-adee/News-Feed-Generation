/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");
const redis = require("redis");
const User = require("./models/User");
const connectionStat = require("./db");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

connectionStat();

const redisClient = redis.createClient();

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

redisClient.on("error", (err) => {
  console.error("Redis error", err);
});

app.get("/api/keyword", async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.keyword);
  } catch (err) {
    console.error("Error fetching keywords", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/keyword", async (req, res) => {
  const { userId, content } = req.body;
  try {
    const keywordExtractionProcess = spawn("python", [
      "extract_keywords.py",
      content,
    ]);

    keywordExtractionProcess.stdout.on("data", async (data) => {
      let newKeywords = data.toString().trim();
      newKeywords = newKeywords ? newKeywords.split(",") : [];
      await redisClient.setEx(userId, 3600, JSON.stringify(newKeywords));

      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedKeywords = [...user.keyword, ...newKeywords];
      if (updatedKeywords.length > 50) {
        updatedKeywords.splice(0, updatedKeywords.length - 50);
      }

      // Update the last 2 keywords if there are new keywords
      if (newKeywords.length >= 2) {
        updatedKeywords.splice(-2, 2, ...newKeywords.slice(-2)); // Replace last 2 elements
      } else if (newKeywords.length > 0) {
        updatedKeywords.splice(
          -newKeywords.length,
          newKeywords.length,
          ...newKeywords
        ); // Replace last N elements
      }

      const updatedUser = await User.findOneAndUpdate(
        { userId },
        { keyword: updatedKeywords },
        { new: true, upsert: true }
      );

      return res.status(200).json(updatedUser); // Return the updated user
    });

    keywordExtractionProcess.stderr.on("data", (error) => {
      console.error(`Error: ${error.toString()}`);
      return res.status(500).json({ message: "Error extracting keywords" });
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/createuser", async (req, res) => {
  const { userId, email, name } = req.body;
  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser)
      return res.status(200).json({ message: "User already exists" });
    await User.create({ name, email, userId });
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating a User", err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// app.post("/existinguser", async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await User.findOne({ userId });
//     if (user) {
//       return res.status(200).json({ message: "User exists", user });
//     } else {
//       return res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     console.error("Error checking for existing user", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
