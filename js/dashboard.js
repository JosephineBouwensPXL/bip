document.addEventListener('DOMContentLoaded', function() {
    // Set current date in the header
    const dateDisplay = document.querySelector('.date-display span');
    const currentDate = new Date('2025-04-01T16:43:45Z');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
    
    // Set username throughout the dashboard
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(element => {
        element.textContent = 'lucacamilleri';
    });

    // Budget Chart
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    const budgetChart = new Chart(budgetCtx, {
        type: 'bar',
        data: {
            labels: ['Housing', 'Food', 'Transport', 'Education', 'Entertainment', 'Other'],
            datasets: [{
                label: 'Budget',
                data: [600, 350, 150, 200, 100, 150],
                backgroundColor: 'rgba(79, 110, 247, 0.5)',
                borderColor: 'rgba(79, 110, 247, 1)',
                borderWidth: 1
            }, {
                label: 'Actual Spending',
                data: [600, 320, 130, 170, 95, 90],
                backgroundColor: 'rgba(25, 198, 132, 0.5)',
                borderColor: 'rgba(25, 198, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.raw;
                        }
                    }
                }
            }
        }
    });

    // Budget Doughnut Chart
    const doughnutCtx = document.getElementById('budgetDoughnutChart').getContext('2d');
    const doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Food', 'Transport', 'Education', 'Entertainment', 'Other'],
            datasets: [{
                data: [600, 350, 150, 200, 100, 150],
                backgroundColor: [
                    '#3498DB', // Housing
                    '#E74C3C', // Food
                    '#9B59B6', // Transport
                    '#2ECC71', // Education
                    '#F39C12', // Entertainment
                    '#95A5A6'  // Other
                ],
                borderWidth: 1,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: $${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    // Budget Period Selector
    document.getElementById('budgetPeriod').addEventListener('change', function() {
        const period = this.value;
        let budgetData, actualData;
        
        // Simulate different data for different periods
        switch(period) {
            case 'last-month':
                budgetData = [600, 350, 150, 200, 100, 150];
                actualData = [590, 380, 140, 190, 120, 100];
                break;
            case '3-months':
                budgetData = [1800, 1050, 450, 600, 300, 450];
                actualData = [1780, 1100, 420, 580, 320, 440];
                break;
            default: // this-month
                budgetData = [600, 350, 150, 200, 100, 150];
                actualData = [600, 320, 130, 170, 95, 90];
                break;
        }
        
        // Update budget chart data
        budgetChart.data.datasets[0].data = budgetData;
        budgetChart.data.datasets[1].data = actualData;
        budgetChart.update();
    });

    // Add Funds to Savings Goal
    const addFundsButtons = document.querySelectorAll('.add-funds-btn');
    addFundsButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would open a modal to enter amount
            // For demo, we'll just show an alert
            const goalName = this.closest('.goal-card').querySelector('h3').textContent;
            
            // Create and show modal
            const modal = document.createElement('div');
            modal.className = 'funds-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add funds to ${goalName}</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <label for="fundAmount">Amount</label>
                            <div class="amount-input">
                                <span class="currency">$</span>
                                <input type="number" id="fundAmount" placeholder="0.00" min="1" step="0.01">
                            </div>
                        </div>
                        <div class="input-group">
                            <label for="fundSource">Source</label>
                            <select id="fundSource">
                                <option value="main">Main Account</option>
                                <option value="savings">Savings Account</option>
                                <option value="cash">Cash Deposit</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="cancel-btn">Cancel</button>
                        <button class="confirm-btn">Add Funds</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Modal functionality
            const closeModal = () => {
                modal.remove();
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.cancel-btn').addEventListener('click', closeModal);
            
            modal.querySelector('.confirm-btn').addEventListener('click', function() {
                const amount = document.getElementById('fundAmount').value;
                const source = document.getElementById('fundSource').value;
                
                if (!amount || isNaN(amount) || amount <= 0) {
                    alert('Please enter a valid amount.');
                    return;
                }
                
                // Here would be the actual logic to add funds
                // For demo purposes, we'll just show a success message and close the modal
                alert(`Successfully added $${amount} to ${goalName} from ${source}!`);
                
                // Update the goal visual (in a real app this would be based on server response)
                const goalCard = button.closest('.goal-card');
                const progressBar = goalCard.querySelector('.goal-progress');
                const statsText = goalCard.querySelector('.goal-stats span:first-child');
                
                // Extract current values
                const statsMatch = statsText.textContent.match(/\$(\d+,?\d*) \/ \$(\d+,?\d*)/);
                if (statsMatch) {
                    const current = parseFloat(statsMatch[1].replace(',', ''));
                    const target = parseFloat(statsMatch[2].replace(',', ''));
                    const newAmount = current + parseFloat(amount);
                    const newPercentage = Math.min(Math.round((newAmount / target) * 100), 100);
                    
                    // Update the UI
                    statsText.textContent = `$${newAmount.toLocaleString()} / $${target.toLocaleString()}`;
                    goalCard.querySelector('.goal-stats span:last-child').textContent = `${newPercentage}%`;
                    progressBar.style.width = `${newPercentage}%`;
                    
                    // Confetti effect for completed goals
                    if (newPercentage >= 100) {
                        createConfetti(goalCard);
                    }
                }
                
                closeModal();
            });

            // Close when clicking outside the modal content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        });
    });

    // Financial Tip Rotation
    const tips = [
        "Try the 50/30/20 rule: 50% for necessities, 30% for wants, and 20% for savings and debt repayment.",
        "Start an emergency fund that can cover at least 3 months of expenses.",
        "Always pay off high-interest debt first, especially credit cards.",
        "Use student discounts whenever possible - they add up over time!",
        "Consider getting a side hustle to boost your income while studying.",
        "Track every expense for at least one month to identify spending patterns.",
        "Automate your savings by setting up regular transfers to your savings account.",
        "Before making a large purchase, wait 24-48 hours to avoid impulse buying.",
        "Cook meals at home instead of eating out to save significantly."
    ];
    
    let currentTipIndex = 0;
    const tipText = document.querySelector('.tip-text');
    const nextTipBtn = document.querySelector('.next-tip-btn');
    
    nextTipBtn.addEventListener('click', function() {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        tipText.textContent = tips[currentTipIndex];
        
        // Add appear animation
        tipText.classList.add('tip-animation');
        setTimeout(() => {
            tipText.classList.remove('tip-animation');
        }, 500);
    });
    
    // Challenge button functionality
    const challengeBtn = document.querySelector('.challenge-btn');
    challengeBtn.addEventListener('click', function() {
        const challengeCards = document.querySelectorAll('.challenge-card');
        challengeCards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the daily challenge
        challengeCards[0].classList.add('highlight');
        setTimeout(() => {
            challengeCards[0].classList.remove('highlight');
        }, 1500);
    });
    
    // Mobile menu toggle for sidebar
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Achievement badge tooltips
    const achievementBadges = document.querySelectorAll('.achievement-badge');
    achievementBadges.forEach(badge => {
        const title = badge.getAttribute('title');
        
        badge.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = title;
            document.body.appendChild(tooltip);
            
            const rect = badge.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            badge.addEventListener('mouseleave', function() {
                tooltip.remove();
            });
        });
    });
    
    // Confetti animation for completed goals
    function createConfetti(element) {
        const colors = ['#4F6EF7', '#19C684', '#F39C12', '#E74C3C', '#9B59B6'];
        const confettiCount = 100;
        const container = document.createElement('div');
        container.className = 'confetti-container';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.overflow = 'hidden';
        
        element.style.position = 'relative';
        element.appendChild(container);
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'absolute';
            confetti.style.width = Math.random() * 8 + 4 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            
            // Animation
            const fallDuration = Math.random() * 2 + 2;
            const swingDuration = Math.random() * 2 + 1;
            
            confetti.style.animation = `
                fall ${fallDuration}s linear forwards, 
                swing ${swingDuration}s ease-in-out infinite alternate
            `;
            
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, fallDuration * 1000);
        }
        
        // Remove the container after all confetti are gone
        setTimeout(() => {
            container.remove();
        }, 5000);
    }
    
    // Add necessary CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(300px) rotate(360deg); }
        }
        
        @keyframes swing {
            0% { margin-left: -15px; }
            100% { margin-left: 15px; }
        }
        
        .tip-animation {
            animation: fadeIn 0.5s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .highlight {
            animation: pulse 1.5s;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(241, 196, 15, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(241, 196, 15, 0); }
            100% { box-shadow: 0 0 0 0 rgba(241, 196, 15, 0); }
        }
        
        .tooltip {
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
        
        .funds-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            border-radius: 8px;
            width: 90%;
            max-width: 400px;
            overflow: hidden;
        }
        
        .modal-header {
            padding: 15px 20px;
            border-bottom: 1px solid #E2E8F0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #E2E8F0;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748B;
        }
        
        .input-group {
            margin-bottom: 15px;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .amount-input {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        .amount-input .currency {
            position: absolute;
            left: 10px;
            font-weight: 500;
        }
        
        .amount-input input {
            padding: 10px 10px 10px 25px;
            width: 100%;
            border: 1px solid #E2E8F0;
            border-radius: 4px;
        }
        
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #E2E8F0;
            border-radius: 4px;
            background-color: white;
        }
        
        .cancel-btn {
            padding: 8px 16px;
            background-color: #F8FAFC;
            color: #64748B;
            border-radius: 4px;
        }
        
        .confirm-btn {
            padding: 8px 16px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
    
    // Chatbot functionality (from original script.js)
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
        messageText.textContent = text;
        
        messageDiv.appendChild(messageText);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function botResponse(userText) {
        let response = '';
        
        // Dashboard-specific responses
        if (userText.toLowerCase().includes('budget') || userText.toLowerCase().includes('spending')) {
            response = "Looking at your budget, you're doing well! You're currently under budget in most categories. Need help adjusting any specific category?";
        } else if (userText.toLowerCase().includes('save') || userText.toLowerCase().includes('saving') || userText.toLowerCase().includes('goal')) {
            response = "I see you have three savings goals. Your summer trip is 75% funded, which is great progress! Would you like to set up automatic contributions to reach your goals faster?";
        } else if (userText.toLowerCase().includes('challenge') || userText.toLowerCase().includes('achievement')) {
            response = "You're on a 7-day streak with your financial challenges! Complete today's No-Spend Tuesday challenge to earn 25 XP and level up faster.";
        } else if (userText.toLowerCase().includes('transaction') || userText.toLowerCase().includes('spend')) {
            response = "Your recent transactions look good. I notice you've been spending less on entertainment this month compared to last month. Great job sticking to your budget!";
        } else if (userText.toLowerCase().includes('level') || userText.toLowerCase().includes('xp')) {
            response = "You're currently at Level 12. You need 165 more XP to reach Level 13. Completing challenges and reaching savings goals are the fastest ways to earn XP!";
        } else {
            response = "I can help you manage your finances better. Would you like tips on budgeting, saving, or information about your current financial status?";
        }
        
        addMessage('bot', response);
    }
});

// Add these JavaScript functions to handle mobile sidebar and responsiveness
// Place them at the end of your existing dashboard.js file

// Mobile sidebar functionality
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
const mobileSidebarMenu = document.getElementById('mobileSidebarMenu');
const closeSidebar = document.getElementById('closeSidebar');

if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener('click', function() {
        mobileSidebarMenu.style.display = 'block';
        document.body.classList.add('body-no-scroll');
        setTimeout(() => {
            mobileSidebarMenu.classList.add('active');
        }, 10);
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', closeSidebarMenu);
}

if (mobileSidebarMenu) {
    mobileSidebarMenu.addEventListener('click', function(e) {
        if (e.target === mobileSidebarMenu) {
            closeSidebarMenu();
        }
    });
}

function closeSidebarMenu() {
    mobileSidebarMenu.classList.remove('active');
    setTimeout(() => {
        mobileSidebarMenu.style.display = 'none';
        document.body.classList.remove('body-no-scroll');
    }, 300);
}

// Mobile navigation item functionality
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
        this.classList.add('active');
    });
});

// Adjust chart options for better mobile display
function adjustChartsForMobile() {
    if (window.innerWidth <= 768) {
        // Update budget chart options for mobile
        if (budgetChart) {
            budgetChart.options.plugins.legend.position = 'bottom';
            budgetChart.options.maintainAspectRatio = false;
            budgetChart.update();
        }
        
        // Update doughnut chart options for mobile
        if (doughnutChart) {
            doughnutChart.options.plugins.legend.display = false;
            doughnutChart.update();
        }
    } else {
        // Restore desktop options
        if (budgetChart) {
            budgetChart.options.plugins.legend.position = 'top';
            budgetChart.update();
        }
    }
}

// Call on load and resize
window.addEventListener('load', adjustChartsForMobile);
window.addEventListener('resize', adjustChartsForMobile);

// Handle horizontal scrolling for charts on mobile
const chartContainers = document.querySelectorAll('.chart-container');
chartContainers.forEach(container => {
    if (window.innerWidth <= 768) {
        container.addEventListener('touchstart', function(e) {
            this.startX = e.touches[0].clientX;
        }, { passive: true });
        
        container.addEventListener('touchmove', function(e) {
            if (!this.startX) return;
            
            const diffX = this.startX - e.touches[0].clientX;
            this.scrollLeft += diffX;
            this.startX = e.touches[0].clientX;
        }, { passive: true });
        
        container.addEventListener('touchend', function() {
            this.startX = null;
        }, { passive: true });
    }
});

// Update timestamp dynamically
const timestampElements = document.querySelectorAll('.date-display span');
const currentDate = new Date('2025-04-01T16:48:05Z');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);

timestampElements.forEach(element => {
    element.textContent = formattedDate;
});

// Update username throughout the interface
const usernameElements = document.querySelectorAll('.user-name, .mobile-user-name');
usernameElements.forEach(element => {
    element.textContent = 'lucacamilleri';
});