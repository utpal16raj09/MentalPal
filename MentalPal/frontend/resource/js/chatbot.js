document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Function to add a message to the chat window
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        messageElement.classList.add('message');
        if (sender === 'user') {
            messageElement.classList.add('user-message');
            messageElement.innerHTML = `<p>${text}</p><span class="message-timestamp">${timestamp}</span>`;
        } else {
            messageElement.classList.add('bot-message');
            messageElement.innerHTML = `<p>${text}</p><span class="message-timestamp">${timestamp}</span>`;
        }
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    }

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();

        if (userMessage !== '') {
            addMessage(userMessage, 'user');
            chatInput.value = '';

            // Simulate a bot response
            setTimeout(() => {
                const botResponse = "Thank you for sharing. That's a valid feeling to have. How else can I help?";
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    });

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmed = confirm("Are you sure you want to log out?");
            if (confirmed) {
                localStorage.removeItem('userName');
                localStorage.removeItem('theme');
                localStorage.removeItem('registeredUsers'); 
                window.location.href = 'login.html'; 
            }
        });
    }
});