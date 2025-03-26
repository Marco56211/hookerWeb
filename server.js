

//websockets

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

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
