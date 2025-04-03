document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Chatbot Functionality
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userMessage = document.getElementById('userMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Toggle chat popup
    chatButton.addEventListener('click', function() {
        chatPopup.style.display = chatPopup.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close chat popup
    closeChat.addEventListener('click', function() {
        chatPopup.style.display = 'none';
    });

    // Send message functionality
    sendMessage.addEventListener('click', sendUserMessage);
    userMessage.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    function sendUserMessage() {
        const message = userMessage.value.trim();
        
        if (message !== '') {
            // Add user message to chat
            addMessage('user', message);
            
            // Clear input
            userMessage.value = '';
            
            // Simulate bot response (in a real app, this would call your backend)
            setTimeout(function() {
                botResponse(message);
            }, 600);
        }
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
        
        const messageText = document.createElement('p');
        // Use innerHTML for messages that may contain HTML
        messageText.innerHTML = text;
        
        messageDiv.appendChild(messageText);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function botResponse(userText) {
        let response = '';
        
        // Simple response logic - in a real app, this would be much more sophisticated
        if (userText.toLowerCase().includes('budget') || userText.toLowerCase().includes('spending')) {
            response = "I can help you create a budget! You can set up spending categories and track your expenses easily with our budget tool.";
        } else if (userText.toLowerCase().includes('save') || userText.toLowerCase().includes('saving')) {
            response = "Setting savings goals is a great idea! You can create specific goals and track your progress over time.";
        } else if (userText.toLowerCase().includes('discount') || userText.toLowerCase().includes('deal')) {
            response = "We have a section dedicated to student discounts! Check out the 'Student Discounts' feature to find deals on everything from software to food.";
        } else if (userText.toLowerCase().includes('website')) {
            response = `Take a look at our <a href='jobs.html#1' class='job-link id='1'>available job offers</a> for Web Development.`;
            
        }else {
            response = "Thanks for your message! Our full financial advice features will be available in the next version. Is there anything specific about student finances you'd like to know?";
        }
        
        addMessage('bot', response);
    }

    // For demo purposes - add a welcome message after a slight delay
    setTimeout(function() {
        // The welcome message is already in the HTML
    }, 500);
});