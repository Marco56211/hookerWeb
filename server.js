//polling

// const express = require("express");
// const path = require("path");
// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json());
// let notifications = [];
// // Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, "public")));

// // Handle API routes (like webhook and notifications)
// app.get("/api/webhook", (req, res) => {
//   res.status(200).json(notifications);
// });
// app.post("/api/webhook", (req, res) => {
//   notifications.push(req.body);

//   res.sendStatus(200);
// });
// // app.use('/api/webhook', require('./server/api/webhook'));  // Assuming your webhook.js is in the 'api' folder
// // app.use('/api', require('./server/api/notifications'));  // Assuming your notifications.js is in the 'api' folder

// // Serve the index.html (or other entry point)
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });



//websockets

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let clients = [];

// SSE endpoint for frontend to receive messages
app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    clients.push(res);

    req.on("close", () => {
        clients = clients.filter(client => client !== res);
    });
});

// Webhook endpoint
app.post("/webhook", (req, res) => {
    console.log("Received webhook:", req.body);
    const message = `data: ${JSON.stringify(req.body)}\n\n`;

    // Send webhook data to all connected clients
    clients.forEach(client => client.write(message));

    res.status(200).send("Webhook received");
});

// Serve the index.html (or other entry point)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
