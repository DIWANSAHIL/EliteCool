document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header
    const header = document.querySelector('.main-header');
    const emergencyAlert = document.querySelector('.emergency-alert');
    const alertHeight = emergencyAlert.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Live chat widget
    const chatWidget = document.querySelector('.live-chat-widget');
    const chatToggle = document.querySelector('.chat-toggle');
    
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('active');
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (!chatWidget.contains(e.target)) {
            chatWidget.classList.remove('active');
        }
    });
    
    // Initialize service area map
    function initServiceMap() {
        const map = L.map('serviceAreaMap').setView([51.505, -0.09], 11);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add service area polygon
        const serviceArea = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ], {
            color: '#00a8e8',
            fillOpacity: 0.1,
            weight: 2
        }).addTo(map);
        
        // Add marker for business location
        L.marker([51.505, -0.09]).addTo(map)
            .bindPopup('<b>EliteCool HVAC</b><br>123 HVAC Way, Anytown')
            .openPopup();
    }
    
    // Initialize map when Leaflet is loaded
    if (typeof L !== 'undefined') {
        initServiceMap();
    }
    
    // Pricing tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form submission
    const serviceForm = document.getElementById('serviceRequestForm');
    
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your service request! We will contact you shortly.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Current year in footer
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});