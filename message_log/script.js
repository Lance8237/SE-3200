const API_URL = "http://127.0.0.1:5000/messages";

async function getMessages() {
	const response = await fetch(API_URL);
	const messages = await response.json();

	const messageList = document.getElementById("messages");

	messageList.innerHTML = "";

	messages.forEach(function(message) {
		const messageElement = document.createElement("p");
		messageElement.textContent = message;
		messageList.appendChild(messageElement);
	});
}

async function addMessage(message) {
	await fetch(API_URL, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({message: message})
	});

	getMessages();
}

document.getElementById("messageForm").addEventListener("submit", function(event) {
	event.preventDefault();

	const input = document.getElementById("messageInput");
	const message = input.value;

	addMessage(message);

	input.value = "";
});

getMessages();