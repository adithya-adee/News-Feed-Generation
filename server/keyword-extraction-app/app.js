/* eslint-disable @typescript-eslint/no-require-imports */

require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const { exec } = require("child_process");
const User = require("./models/User");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Connect to Redis
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Keyword Extraction Endpoint
app.post("/keyword", async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: "userId and content are required" });
  }

  const redisKey = `keywords:${content}`;

  // Check Redis cache
  redisClient.get(redisKey, async (err, cachedKeywords) => {
    if (err) {
      console.error("Redis error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (cachedKeywords) {
      // Keywords are cached
      console.log("Returning cached keywords");
      await updateUserKeywords(userId, JSON.parse(cachedKeywords), res);
    } else {
      // Keywords not cached, run Python script
      exec(
        `python3 extract_keywords.py "${content.replace(/"/g, '\\"')}"`,
        async (error, stdout, stderr) => {
          if (error) {
            console.error("Error executing Python script:", error.message);
            return res
              .status(500)
              .json({ message: "Error processing content" });
          }

          if (stderr) {
            console.error("Python stderr:", stderr);
          }

          try {
            const keywords = JSON.parse(stdout.trim());
            // Cache the keywords
            redisClient.setex(redisKey, 86400, JSON.stringify(keywords)); // Cache for 24 hours

            await updateUserKeywords(userId, keywords, res);
          } catch (parseError) {
            console.error("Error parsing Python output:", parseError);
            return res
              .status(500)
              .json({ message: "Error processing keywords" });
          }
        }
      );
    }
  });
});

// Function to update user's keywords in MongoDB
async function updateUserKeywords(userId, keywords, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $addToSet: { keywords: { $each: keywords } } },
      { new: true, upsert: true }
    );

    res.json({
      message: "Keywords processed successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user keywords:", err);
    res.status(500).json({ message: "Error updating user keywords" });
  }
}

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
