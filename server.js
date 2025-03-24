const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());
let notifications = [];
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Handle API routes (like webhook and notifications)
app.get("/api/webhook", (req, res) => {
  res.status(200).json(notifications);
});
app.post("/api/webhook", (req, res) => {
  notifications.push(req.body);

  res.sendStatus(200);
});
// app.use('/api/webhook', require('./server/api/webhook'));  // Assuming your webhook.js is in the 'api' folder
// app.use('/api', require('./server/api/notifications'));  // Assuming your notifications.js is in the 'api' folder

// Serve the index.html (or other entry point)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
