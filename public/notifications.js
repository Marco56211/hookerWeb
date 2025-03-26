
const eventSource = new EventSource("/events");

eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const messagesDiv = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = JSON.stringify(data);

    messagesDiv.appendChild(div);
};
eventSource.onerror = function () {
    console.error("EventSource error - trying to reconnect...");
};


//handle the expansion of elements on click

const allMessages = document.querySelectorAll("#messages");
if(allMessages) {

allMessages.forEach(function (message) {
    message.onclick = function () {
        // Toggle between maxHeight 50px and 200px
        if (this.style.maxHeight === "50px") {
            this.style.maxHeight = "200px";
        } else {
            this.style.maxHeight = "50px";
        }
    };
})
}

