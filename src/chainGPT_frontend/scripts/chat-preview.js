// Chat Preview Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeChatDemo();
    initializeSuggestions();
    initializeScrollAnimations();
});

// Initialize chat demo with animated message sequence
function initializeChatDemo() {
    const messages = document.querySelectorAll('.message[data-delay]');
    const chatMessages = document.getElementById('chat-messages');
    
    // Initially hide messages with delays
    messages.forEach(message => {
        message.style.display = 'none';
    });
    
    // Show messages with delays
    messages.forEach(message => {
        const delay = parseInt(message.getAttribute('data-delay'));
        
        setTimeout(() => {
            message.style.display = 'flex';
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            
            // Animate in
            setTimeout(() => {
                message.style.transition = 'all 0.6s ease';
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Add typing effect for bot messages
                if (message.classList.contains('bot')) {
                    addTypingEffect(message);
                }
            }, 100);
        }, delay);
    });
    
    // Auto-restart demo after completion
    const totalDuration = Math.max(...Array.from(messages).map(m => parseInt(m.getAttribute('data-delay')))) + 3000;
    
    setInterval(() => {
        restartDemo();
    }, totalDuration + 10000); // Restart after 10 seconds pause
}

// Add typing effect to bot messages
function addTypingEffect(messageElement) {
    const messageText = messageElement.querySelector('.message-text');
    if (!messageText) return;
    
    // Add typing indicator temporarily
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    // Insert typing indicator before the message
    const tempMessage = messageElement.cloneNode(true);
    const tempContent = tempMessage.querySelector('.message-text');
    tempContent.innerHTML = '';
    tempContent.appendChild(typingIndicator);
    
    messageElement.parentNode.insertBefore(tempMessage, messageElement);
    messageElement.style.display = 'none';
    
    // Show actual message after typing delay
    setTimeout(() => {
        tempMessage.remove();
        messageElement.style.display = 'flex';
        
        // Animate widgets if present
        animateWidgets(messageElement);
    }, 1500);
}

// Animate widgets within messages
function animateWidgets(messageElement) {
    const widgets = messageElement.querySelectorAll('.portfolio-widget, .order-widget, .sentiment-widget');
    
    widgets.forEach(widget => {
        widget.style.opacity = '0';
        widget.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            widget.style.transition = 'all 0.5s ease';
            widget.style.opacity = '1';
            widget.style.transform = 'scale(1)';
            
            // Animate specific widget elements
            animateWidgetElements(widget);
        }, 200);
    });
}

// Animate elements within widgets
function animateWidgetElements(widget) {
    // Animate portfolio assets
    const assetItems = widget.querySelectorAll('.asset-item');
    assetItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Animate sentiment indicators
    const indicators = widget.querySelectorAll('.indicator-fill');
    indicators.forEach((fill, index) => {
        const targetWidth = fill.style.width;
        fill.style.width = '0';
        
        setTimeout(() => {
            fill.style.transition = 'width 1s ease';
            fill.style.width = targetWidth;
        }, index * 200 + 500);
    });
    
    // Animate order details
    const orderRows = widget.querySelectorAll('.order-row');
    orderRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(5px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });
}

// Restart demo animation
function restartDemo() {
    const messages = document.querySelectorAll('.message[data-delay]');
    const chatMessages = document.getElementById('chat-messages');
    
    // Hide all demo messages
    messages.forEach(message => {
        message.style.display = 'none';
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
    });
    
    // Scroll to top
    chatMessages.scrollTop = 0;
    
    // Restart the sequence
    setTimeout(() => {
        initializeChatDemo();
    }, 1000);
}

// Initialize suggestion buttons
function initializeSuggestions() {
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const messageInput = document.getElementById('message-input');
    
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-text');
            if (messageInput && text) {
                messageInput.value = text;
                messageInput.focus();
                
                // Add visual feedback
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Add hover effects to command examples
    const commandItems = document.querySelectorAll('.command-item');
    commandItems.forEach(item => {
        item.addEventListener('click', () => {
            const commandText = item.querySelector('.command-text').textContent;
            if (messageInput) {
                messageInput.value = commandText.replace(/"/g, '');
                messageInput.focus();
                
                // Scroll to input
                messageInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

// Initialize scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-preview-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Add CSS for animations and effects
const additionalCSS = `
.animate-in {
    opacity: 1 !important;
    transform: translate(0, 0) !important;
}

.typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 0;
}

.typing-indicator span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-color);
    animation: typing-dot 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing-dot {
    0%, 60%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    30% {
        opacity: 1;
        transform: scale(1);
    }
}

.message {
    animation-delay: var(--delay, 0s);
}

.portfolio-widget:hover,
.order-widget:hover,
.sentiment-widget:hover {
    background: rgba(0, 0, 0, 0.4);
    border-color: var(--accent-color);
    transform: translateY(-2px);
}

.asset-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(3px);
}

.command-item {
    cursor: pointer;
}

.command-item:active {
    transform: scale(0.98);
}

.suggestion-btn:active {
    transform: scale(0.95);
}

.feature-preview-card {
    cursor: pointer;
}

.info-card {
    position: relative;
    overflow: hidden;
}

.info-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
}

.info-card:hover::before {
    left: 100%;
}

.chat-container {
    position: relative;
    overflow: hidden;
}

.chat-container::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, var(--accent-color), var(--secondary-color), var(--accent-color));
    background-size: 200% 200%;
    animation: borderGlow 3s ease-in-out infinite;
    border-radius: 22px;
    z-index: -1;
    opacity: 0.5;
}

@keyframes borderGlow {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

.demo-badge {
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Add interactive features
document.addEventListener('click', function(e) {
    // Add ripple effect to buttons
    if (e.target.matches('.btn, .action-btn, .suggestion-btn')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);