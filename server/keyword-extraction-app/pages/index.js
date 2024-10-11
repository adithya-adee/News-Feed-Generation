/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const connectionStat = require("../db");

const User = require("../userSchema");

const app = express();

connectionStat();

app.use(express.json());

app.post("/keyword", async (req, res) => {
  const { userId, content } = req.body;

  try {
    // Update user's keyword array by adding the new keyword
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        $addToSet: { keywords: keyword },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    // Successful response
    res.json({
      message: "Keyword added successfully",
      user: updatedUser,
      status: true,
    });
  } catch (err) {
    console.error("Error updating the keyword", err);
    res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
});

app.listen(8080, () => {
  console.log("Listening to the port 8080");
});
