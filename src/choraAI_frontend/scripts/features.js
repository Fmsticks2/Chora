// Features page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeFeatureTabs();
    initializeComparisonTable();
    initializeFeatureAnimations();
});

// Tab functionality for feature sections
function initializeFeatureTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Trigger animation for the newly active tab
            animateTabContent(targetTab);
        });
    });
}

// Animate tab content when switching
function animateTabContent(tabId) {
    const tabContent = document.getElementById(tabId);
    const highlights = tabContent.querySelectorAll('.highlight-item');
    const visual = tabContent.querySelector('.feature-visual');
    
    // Reset animations
    highlights.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
    
    if (visual) {
        visual.style.opacity = '0';
        visual.style.transform = 'translateX(20px)';
    }
    
    // Animate in with delays
    highlights.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    if (visual) {
        setTimeout(() => {
            visual.style.transition = 'all 0.8s ease';
            visual.style.opacity = '1';
            visual.style.transform = 'translateX(0)';
        }, highlights.length * 150);
    }
}

// Initialize comparison table animations
function initializeComparisonTable() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rows = entry.target.querySelectorAll('.comparison-row');
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.style.opacity = '1';
                        row.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        // Initially hide rows
        const rows = comparisonTable.querySelectorAll('.comparison-row');
        rows.forEach(row => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';
            row.style.transition = 'all 0.6s ease';
        });
        
        observer.observe(comparisonTable);
    }
}

// Initialize feature-specific animations
function initializeFeatureAnimations() {
    // Chat demo typing animation
    initializeChatDemo();
    
    // Chain fusion diagram animation
    initializeChainFusionDiagram();
    
    // Prediction chart animation
    initializePredictionChart();
    
    // Automation dashboard animation
    initializeAutomationDashboard();
    
    // Strategy marketplace animation
    initializeStrategyMarketplace();
}

// Chat demo typing effect
function initializeChatDemo() {
    const chatDemo = document.querySelector('.chat-demo');
    if (!chatDemo) return;
    
    const messages = chatDemo.querySelectorAll('.chat-message');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChatMessages(messages);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(chatDemo);
}

function animateChatMessages(messages) {
    messages.forEach(message => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
    });
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.transition = 'all 0.6s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
            
            // Add typing effect to bot messages
            if (message.classList.contains('bot')) {
                const content = message.querySelector('.message-content');
                if (content) {
                    content.classList.add('typing-effect');
                }
            }
        }, index * 800);
    });
}

// Chain fusion diagram animation
function initializeChainFusionDiagram() {
    const diagram = document.querySelector('.chain-fusion-diagram');
    if (!diagram) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChainNodes();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(diagram);
}

function animateChainNodes() {
    const nodes = document.querySelectorAll('.chain-node');
    const lines = document.querySelector('.fusion-lines');
    
    nodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.8)';
    });
    
    if (lines) {
        lines.style.opacity = '0';
    }
    
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.transition = 'all 0.8s ease';
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, index * 300);
    });
    
    if (lines) {
        setTimeout(() => {
            lines.style.transition = 'opacity 1s ease';
            lines.style.opacity = '1';
        }, nodes.length * 300);
    }
}

// Prediction chart animation
function initializePredictionChart() {
    const chart = document.querySelector('.prediction-chart');
    if (!chart) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePredictionChart();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(chart);
}

function animatePredictionChart() {
    const lines = document.querySelectorAll('.price-line');
    const zone = document.querySelector('.prediction-zone');
    
    lines.forEach(line => {
        line.style.width = '0';
    });
    
    if (zone) {
        zone.style.opacity = '0';
    }
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transition = 'width 1.5s ease';
            line.style.width = '100%';
        }, index * 500);
    });
    
    if (zone) {
        setTimeout(() => {
            zone.style.transition = 'opacity 1s ease';
            zone.style.opacity = '0.3';
        }, lines.length * 500);
    }
}

// Automation dashboard animation
function initializeAutomationDashboard() {
    const dashboard = document.querySelector('.automation-dashboard');
    if (!dashboard) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAutomationItems();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(dashboard);
}

function animateAutomationItems() {
    const items = document.querySelectorAll('.automation-item');
    
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
    });
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Strategy marketplace animation
function initializeStrategyMarketplace() {
    const marketplace = document.querySelector('.strategy-marketplace');
    if (!marketplace) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStrategyCards();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(marketplace);
}

function animateStrategyCards() {
    const cards = document.querySelectorAll('.strategy-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Add CSS for additional animations
const additionalCSS = `
.typing-effect {
    overflow: hidden;
    border-right: 2px solid var(--accent-color);
    white-space: nowrap;
    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: var(--accent-color); }
}

.chain-node {
    transition: transform 0.3s ease;
}

.chain-node:hover {
    transform: scale(1.1) !important;
}

.strategy-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.strategy-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

.automation-item {
    transition: all 0.3s ease;
}

.automation-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);