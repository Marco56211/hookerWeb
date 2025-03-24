function startPolling() {
    setInterval(async () => {
        const response = await fetch('/api/webhook'); // Replace with your Vercel endpoint
        const data = await response.json();
        if (data.length > 0) {
            // Process new notifications
            console.log('New notifications:', data);
        }
    }, 5000); // Poll every 5 seconds
}

startPolling();
