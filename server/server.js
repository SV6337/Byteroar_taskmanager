const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy data
const users = [
  { id: 1, name: "Anurag" },
  { id: 2, name: "Rahul" }
];

// GET user by ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});