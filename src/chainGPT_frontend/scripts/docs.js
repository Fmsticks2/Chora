// Documentation JavaScript Functionality

class DocsManager {
    constructor() {
        this.currentSection = 'introduction';
        this.sidebarOpen = false;
        this.searchIndex = [];
        this.init();
    }

    init() {
        this.initNavigation();
        this.initSearch();
        this.initFAQ();
        this.initCodeBlocks();
        this.initResponsiveHandling();
        this.initScrollSpy();
        this.buildSearchIndex();
    }

    initNavigation() {
        const navItems = document.querySelectorAll('.docs-nav .nav-item');
        const sections = document.querySelectorAll('.docs-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.getAttribute('href').substring(1);
                
                if (sectionId && sectionId !== this.currentSection) {
                    this.switchSection(sectionId);
                }
            });
        });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && hash !== this.currentSection) {
                this.switchSection(hash);
            }
        });

        // Check initial hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash)) {
            this.switchSection(initialHash);
        }
    }

    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.docs-nav .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[href="#${sectionId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Update sections
        document.querySelectorAll('.docs-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        this.currentSection = sectionId;
        
        // Update URL hash
        history.pushState(null, null, `#${sectionId}`);
        
        // Scroll to top of content
        document.querySelector('.docs-main').scrollTop = 0;
        
        // Add animation
        if (activeSection) {
            activeSection.style.opacity = '0';
            activeSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeSection.style.transition = 'all 0.3s ease';
                activeSection.style.opacity = '1';
                activeSection.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    initSearch() {
        const searchInput = document.getElementById('docs-search');
        const searchResults = this.createSearchResults();
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                
                if (query.length > 2) {
                    this.performSearch(query, searchResults);
                    searchResults.style.display = 'block';
                } else {
                    searchResults.style.display = 'none';
                }
            });

            // Hide search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }

    createSearchResults() {
        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchResults.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-md);
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            margin-top: 4px;
        `;
        
        document.querySelector('.search-box').appendChild(searchResults);
        return searchResults;
    }

    buildSearchIndex() {
        const sections = document.querySelectorAll('.docs-section');
        
        sections.forEach(section => {
            const sectionId = section.id;
            const title = section.querySelector('h1')?.textContent || '';
            const content = section.textContent.toLowerCase();
            
            // Index headings
            const headings = section.querySelectorAll('h2, h3, h4');
            headings.forEach(heading => {
                this.searchIndex.push({
                    id: sectionId,
                    title: heading.textContent,
                    type: 'heading',
                    content: heading.textContent.toLowerCase()
                });
            });
            
            // Index section
            this.searchIndex.push({
                id: sectionId,
                title: title,
                type: 'section',
                content: content
            });
        });
    }

    performSearch(query, resultsContainer) {
        const results = this.searchIndex.filter(item => 
            item.content.includes(query)
        ).slice(0, 8); // Limit to 8 results
        
        resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div style="padding: var(--spacing-md); color: var(--text-secondary); text-align: center;">
                    No results found for "${query}"
                </div>
            `;
            return;
        }
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.style.cssText = `
                padding: var(--spacing-sm) var(--spacing-md);
                cursor: pointer;
                border-bottom: 1px solid var(--border-color);
                transition: background 0.2s ease;
            `;
            
            resultItem.innerHTML = `
                <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 2px;">
                    ${result.title}
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">
                    ${result.type === 'section' ? 'Section' : 'Heading'}
                </div>
            `;
            
            resultItem.addEventListener('mouseenter', () => {
                resultItem.style.background = 'var(--bg-primary)';
            });
            
            resultItem.addEventListener('mouseleave', () => {
                resultItem.style.background = 'transparent';
            });
            
            resultItem.addEventListener('click', () => {
                this.switchSection(result.id);
                resultsContainer.style.display = 'none';
                document.getElementById('docs-search').value = '';
            });
            
            resultsContainer.appendChild(resultItem);
        });
    }

    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    initCodeBlocks() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const codeBlock = btn.closest('.code-block');
                const code = codeBlock.querySelector('code');
                
                if (code) {
                    navigator.clipboard.writeText(code.textContent).then(() => {
                        const originalText = btn.textContent;
                        btn.innerHTML = '<svg class="icon"><use href="assets/icons.svg#check-icon"></use></svg> Copied!';
                        btn.style.color = 'var(--success-color)';
                        
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.style.color = '';
                        }, 2000);
                    }).catch(() => {
                        btn.innerHTML = '<svg class="icon"><use href="assets/icons.svg#warning-icon"></use></svg> Failed';
                        btn.style.color = 'var(--error-color)';
                        
                        setTimeout(() => {
                            btn.innerHTML = '<svg class="icon"><use href="assets/icons.svg#copy-icon"></use></svg> Copy';
                            btn.style.color = '';
                        }, 2000);
                    });
                }
            });
        });
    }

    initResponsiveHandling() {
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.querySelector('.docs-sidebar');
        
        if (hamburger && sidebar) {
            hamburger.addEventListener('click', () => {
                this.sidebarOpen = !this.sidebarOpen;
                sidebar.classList.toggle('open', this.sidebarOpen);
                hamburger.classList.toggle('active', this.sidebarOpen);
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && this.sidebarOpen) {
                if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                    this.sidebarOpen = false;
                    sidebar.classList.remove('open');
                    hamburger.classList.remove('active');
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.sidebarOpen = false;
                sidebar.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('.docs-section');
        const navItems = document.querySelectorAll('.docs-nav .nav-item');
        
        // Create intersection observer for scroll spy
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('active')) {
                    const sectionId = entry.target.id;
                    
                    // Update navigation
                    navItems.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    const activeNavItem = document.querySelector(`[href="#${sectionId}"]`);
                    if (activeNavItem) {
                        activeNavItem.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-20% 0px -70% 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Utility method to highlight search terms
    highlightSearchTerm(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark style="background: var(--accent-color); color: white; padding: 1px 2px; border-radius: 2px;">$1</mark>');
    }

    // Method to add smooth scrolling to anchor links
    initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Additional CSS for search and interactive elements
const additionalCSS = `
    .search-results::-webkit-scrollbar {
        width: 6px;
    }
    
    .search-results::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }
    
    .search-results::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 3px;
    }
    
    .search-results::-webkit-scrollbar-thumb:hover {
        background: var(--accent-color);
    }
    
    .docs-sidebar.open {
        transform: translateX(0) !important;
    }
    
    @media (max-width: 1024px) {
        .docs-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
    }
    
    .faq-answer {
        transition: max-height 0.3s ease, padding 0.3s ease;
    }
    
    .faq-item.active .faq-answer {
        max-height: 300px;
    }
    
    .copy-btn {
        transition: all 0.2s ease;
    }
    
    .feature-card,
    .command-card,
    .support-card,
    .capability-item {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .feature-card:nth-child(4) { animation-delay: 0.4s; }
    
    .command-card:nth-child(1) { animation-delay: 0.1s; }
    .command-card:nth-child(2) { animation-delay: 0.2s; }
    .command-card:nth-child(3) { animation-delay: 0.3s; }
    
    .support-card:nth-child(1) { animation-delay: 0.1s; }
    .support-card:nth-child(2) { animation-delay: 0.2s; }
    .support-card:nth-child(3) { animation-delay: 0.3s; }
    .support-card:nth-child(4) { animation-delay: 0.4s; }
    
    .capability-item:nth-child(1) { animation-delay: 0.1s; }
    .capability-item:nth-child(2) { animation-delay: 0.2s; }
    .capability-item:nth-child(3) { animation-delay: 0.3s; }
    .capability-item:nth-child(4) { animation-delay: 0.4s; }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
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

// Initialize documentation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DocsManager();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DocsManager;
}