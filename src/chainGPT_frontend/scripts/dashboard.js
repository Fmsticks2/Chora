// Dashboard JavaScript Functionality

class Dashboard {
    constructor() {
        this.currentSection = 'overview';
        this.sidebarOpen = false;
        this.init();
    }

    init() {
        this.initSidebarNavigation();
        this.initChartAnimations();
        this.initWidgetInteractions();
        this.initResponsiveHandling();
        this.initDemoNotice();
        this.startRealTimeUpdates();
    }

    initSidebarNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.dashboard-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.dataset.section;
                
                if (sectionId && sectionId !== this.currentSection) {
                    this.switchSection(sectionId);
                }
            });
        });
    }

    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        this.currentSection = sectionId;

        // Add transition animation
        const activeSection = document.getElementById(sectionId);
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            activeSection.style.transition = 'all 0.3s ease';
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }, 50);
    }

    initChartAnimations() {
        // Animate chart points
        const chartPoints = document.querySelectorAll('.chart-point');
        chartPoints.forEach((point, index) => {
            point.style.animationDelay = `${index * 0.2}s`;
        });

        // Animate stats cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate dashboard widgets
        const widgets = document.querySelectorAll('.dashboard-widget');
        widgets.forEach((widget, index) => {
            widget.style.opacity = '0';
            widget.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                widget.style.transition = 'all 0.6s ease';
                widget.style.opacity = '1';
                widget.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        });
    }

    initWidgetInteractions() {
        // Chart time period controls
        const controlBtns = document.querySelectorAll('.control-btn');
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                controlBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateChartData(btn.textContent);
            });
        });

        // Widget hover effects
        const widgets = document.querySelectorAll('.dashboard-widget');
        widgets.forEach(widget => {
            widget.addEventListener('mouseenter', () => {
                widget.style.transform = 'translateY(-2px)';
            });
            
            widget.addEventListener('mouseleave', () => {
                widget.style.transform = 'translateY(0)';
            });
        });

        // Stat card hover effects
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.stat-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.stat-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    updateChartData(period) {
        // Simulate chart data update
        const chartLine = document.querySelector('.chart-line');
        const chartPoints = document.querySelectorAll('.chart-point');
        
        if (chartLine) {
            chartLine.style.opacity = '0.3';
            setTimeout(() => {
                chartLine.style.opacity = '1';
            }, 300);
        }

        chartPoints.forEach((point, index) => {
            point.style.opacity = '0';
            setTimeout(() => {
                point.style.opacity = '1';
                // Randomize positions slightly for demo
                const randomOffset = Math.random() * 10 - 5;
                const currentBottom = parseInt(point.style.bottom);
                point.style.bottom = `${Math.max(10, Math.min(80, currentBottom + randomOffset))}%`;
            }, index * 50);
        });
    }

    initResponsiveHandling() {
        // Mobile sidebar toggle
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.querySelector('.dashboard-sidebar');
        
        if (hamburger && sidebar) {
            hamburger.addEventListener('click', () => {
                this.sidebarOpen = !this.sidebarOpen;
                sidebar.classList.toggle('open', this.sidebarOpen);
                hamburger.classList.toggle('active', this.sidebarOpen);
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && this.sidebarOpen) {
                if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                    this.sidebarOpen = false;
                    sidebar.classList.remove('open');
                    hamburger.classList.remove('active');
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.sidebarOpen = false;
                sidebar.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    }

    initDemoNotice() {
        const demoNotice = document.querySelector('.demo-notice');
        const closeBtn = demoNotice?.querySelector('.btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                demoNotice.style.animation = 'slideOutDown 0.5s ease';
                setTimeout(() => {
                    demoNotice.style.display = 'none';
                }, 500);
            });
        }

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (demoNotice && demoNotice.style.display !== 'none') {
                demoNotice.style.opacity = '0.7';
            }
        }, 10000);
    }

    startRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updatePortfolioValue();
            this.updateConnectionStatus();
        }, 5000);

        // Update AI insights periodically
        setInterval(() => {
            this.addNewInsight();
        }, 15000);
    }

    updatePortfolioValue() {
        const portfolioValue = document.querySelector('.stat-value');
        if (portfolioValue && this.currentSection === 'overview') {
            const currentValue = parseFloat(portfolioValue.textContent.replace(/[$,]/g, ''));
            const change = (Math.random() - 0.5) * 100; // Random change
            const newValue = currentValue + change;
            
            portfolioValue.style.transition = 'all 0.3s ease';
            portfolioValue.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                portfolioValue.textContent = `$${newValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;
                portfolioValue.style.transform = 'scale(1)';
            }, 150);
        }
    }

    updateConnectionStatus() {
        const statusIndicator = document.querySelector('.status-indicator');
        if (statusIndicator) {
            // Simulate occasional connection issues
            if (Math.random() < 0.1) {
                statusIndicator.style.background = 'var(--warning-color)';
                setTimeout(() => {
                    statusIndicator.style.background = 'var(--success-color)';
                }, 2000);
            }
        }
    }

    addNewInsight() {
        const insightsList = document.querySelector('.insights-list');
        if (insightsList && this.currentSection === 'overview') {
            const insights = [
                {
                    icon: '📈',
                    type: 'bullish',
                    title: 'Market Opportunity',
                    content: 'Strong buying pressure detected in DeFi tokens. Consider diversification.',
                    time: 'Just now'
                },
                {
                    icon: '⚡',
                    type: 'info',
                    title: 'Quick Update',
                    content: 'ICP network upgrade completed successfully. Enhanced performance expected.',
                    time: 'Just now'
                },
                {
                    icon: '🎯',
                    type: 'warning',
                    title: 'Target Reached',
                    content: 'BTC position has reached 90% of target profit. Consider taking profits.',
                    time: 'Just now'
                }
            ];

            const randomInsight = insights[Math.floor(Math.random() * insights.length)];
            
            const insightElement = document.createElement('div');
            insightElement.className = 'insight-item';
            insightElement.style.opacity = '0';
            insightElement.style.transform = 'translateX(-20px)';
            
            insightElement.innerHTML = `
                <div class="insight-icon ${randomInsight.type}">${randomInsight.icon}</div>
                <div class="insight-content">
                    <h4>${randomInsight.title}</h4>
                    <p>${randomInsight.content}</p>
                    <span class="insight-time">${randomInsight.time}</span>
                </div>
            `;

            insightsList.insertBefore(insightElement, insightsList.firstChild);
            
            // Animate in
            setTimeout(() => {
                insightElement.style.transition = 'all 0.5s ease';
                insightElement.style.opacity = '1';
                insightElement.style.transform = 'translateX(0)';
            }, 100);

            // Remove old insights (keep max 5)
            const allInsights = insightsList.querySelectorAll('.insight-item');
            if (allInsights.length > 5) {
                const oldInsight = allInsights[allInsights.length - 1];
                oldInsight.style.transition = 'all 0.3s ease';
                oldInsight.style.opacity = '0';
                oldInsight.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    oldInsight.remove();
                }, 300);
            }
        }
    }
}

// Additional CSS for animations
const additionalCSS = `
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .stat-icon {
        transition: all 0.3s ease;
    }
    
    .chart-point {
        transition: all 0.3s ease;
    }
    
    .insight-item {
        transition: all 0.3s ease;
    }
    
    .dashboard-widget {
        transition: all 0.3s ease;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dashboard;
}