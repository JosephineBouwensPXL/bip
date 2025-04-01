const balanceDisplay = document.getElementById('balance');
const spendingBar = document.getElementById('spending-bar');
const savingsBar = document.getElementById('savings-bar');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function updateBalance() {
    const randomChange = Math.random() * 100 - 50;
    const currentBalance = parseFloat(balanceDisplay.textContent.replace('$', '').replace(',', ''));
    const newBalance = (currentBalance + randomChange).toFixed(2);
    balanceDisplay.textContent = `$${newBalance}`;
}

function updateGraph(graphBar) {
    graphBar.style.width = `${Math.random() * 80 + 20}%`;
}

function addChatMessage(message, sender = 'AI') {
    const newMessage = document.createElement('p');
    newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChatInput() {
    const message = userInput.value.trim();
    if (!message) return;

    addChatMessage(message, 'You');
    userInput.value = '';

    const lower = message.toLowerCase();

    if (lower.includes('balance')) {
        addChatMessage(`Your current balance is ${balanceDisplay.textContent}`);
    } else if (lower.includes('spending')) {
        addChatMessage('Updating your spending graph...');
        updateGraph(spendingBar);
    } else if (lower.includes('savings')) {
        addChatMessage('Updating your savings graph...');
        updateGraph(savingsBar);
    } else {
        addChatMessage("I'm not sure how to help with that. Try asking about your balance, spending, or savings.");
    }
}

setInterval(updateBalance, 5000);
setInterval(() => updateGraph(spendingBar), 3000);
setInterval(() => updateGraph(savingsBar), 4000);

sendButton.addEventListener('click', handleChatInput);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleChatInput();
    }
});