//Polling

// function startPolling() {
//     setInterval(async () => {
//         const response = await fetch('/api/webhook'); // Replace with your Vercel endpoint
//         const data = await response.json();
//         if (data.length > 0) {
//             // Process new notifications
//             console.log('New notifications:', data);
//         }
//     }, 5000); // Poll every 5 seconds
// }

// startPolling();


//websockets

const eventSource = new EventSource("/events");

eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const messagesDiv = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = JSON.stringify(data);
    messagesDiv.appendChild(div);
};

eventSource.onerror = function() {
    console.error("EventSource error - trying to reconnect...");
};