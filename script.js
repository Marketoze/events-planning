/**
 * ============================================
 * SHAREEF SONS EVENT ORGANIZER
 * Premium Event Planning Website
 * Designed & Developed by Dilawar Pro
 * ============================================
 */

'use strict';

// ============================================
// PRELOADER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('loaded');
            document.body.classList.remove('no-scroll');
            
            // Trigger confetti after preloader
            setTimeout(triggerConfetti, 300);
            
            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                delay: 100
            });
            
            // Start toast
            // Start toast notifications
            setTimeout(startToastNotifications, 3000);
            
            // Initialize GSAP animations
            initGSAPAnimations();
            
            // Initialize counters
            initCounters();
            
        }, 2000);
    });
});

// ============================================
// CONFETTI EFFECT
// ============================================
function triggerConfetti() {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9998 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confetti from left
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#f5af19']
        }));
        
        // Confetti from right
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#f5af19']
        }));
    }, 250);
}

// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
    });

    function animateOutline() {
        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .service-card, .gallery-item, .package-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Active nav link on scroll
function handleActiveNav() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', function() {
    handleNavbarScroll();
    handleActiveNav();
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ============================================
// HERO SLIDER
// ============================================
const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1500,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.hero-slider-pagination',
        clickable: true
    }
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================
const testimonialsSlider = new Swiper('.testimonials-slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.testimonial-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.testimonial-next',
        prevEl: '.testimonial-prev'
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    }
});

// ============================================
// FANCYBOX INITIALIZATION
// ============================================
Fancybox.bind('[data-fancybox]', {
    animated: true,
    showClass: 'fancybox-fadeIn',
    hideClass: 'fancybox-fadeOut',
    dragToClose: true,
    Toolbar: {
        display: {
            left: ['infobar'],
            middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCCW', 'rotateCW', 'flipX', 'flipY'],
            right: ['slideshow', 'thumbs', 'close']
        }
    },
    Images: {
        Panzoom: {
            maxScale: 3
        }
    }
});

// ============================================
// GALLERY FILTER
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
    // Set the countdown date (30 days from now)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

initCountdown();

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// GSAP ANIMATIONS
// ============================================
function initGSAPAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Hero title animation
    gsap.from('.hero-title .title-line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Stats number animation
    gsap.utils.toArray('.stat-card').forEach((stat, i) => {
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(1.7)'
        });
    });
    
    // Gallery items animation
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: 'power2.out'
        });
    });
    
    // Package cards animation
    gsap.utils.toArray('.package-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });
    
    // Floating cards in hero
    gsap.to('.floating-card', {
        y: -15,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
            each: 0.5,
            from: 'random'
        }
    });
    
    // Parallax effect on shapes
    gsap.utils.toArray('.hero-bg-shapes .shape').forEach(shape => {
        gsap.to(shape, {
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: () => Math.random() * 200 - 100,
            rotation: () => Math.random() * 60 - 30
        });
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
const toastData = [
    { name: 'Ahmed Hassan', country: '🇵🇰', service: 'Birthday Party Package' },
    { name: 'Fatima Khan', country: '🇵🇰', service: 'Wedding Planning' },
    { name: 'Mohammed Al-Rashid', country: '🇸🇦', service: 'Corporate Event' },
    { name: 'Priya Sharma', country: '🇮🇳', service: 'Anniversary Celebration' },
    { name: 'Ali Raza', country: '🇵🇰', service: 'Mehndi Event Package' },
    { name: 'Aisha Begum', country: '🇵🇰', service: 'Kids Birthday Party' },
    { name: 'Khalid Abdullah', country: '🇸🇦', service: 'Outdoor Event' },
    { name: 'Rahul Verma', country: '🇮🇳', service: 'Product Launch Event' },
    { name: 'Sara Ahmed', country: '🇵🇰', service: 'Themed Party' },
    { name: 'Omar Farooq', country: '🇸🇦', service: 'Wedding Reception' },
    { name: 'Neha Patel', country: '🇮🇳', service: 'Baby Shower Event' },
    { name: 'Bilal Malik', country: '🇵🇰', service: 'Corporate Conference' },
    { name: 'Zainab Ali', country: '🇵🇰', service: 'Engagement Ceremony' },
    { name: 'Yusuf Ibrahim', country: '🇸🇦', service: 'VIP Event Package' },
    { name: 'Anjali Singh', country: '🇮🇳', service: 'Anniversary Party' },
    { name: 'Hassan Raza', country: '🇵🇰', service: 'Walima Event' },
    { name: 'Maryam Fatima', country: '🇵🇰', service: 'Birthday Decoration' },
    { name: 'Abdul Rahman', country: '🇸🇦', service: 'Luxury Wedding' },
    { name: 'Pooja Gupta', country: '🇮🇳', service: 'Team Building Event' },
    { name: 'Usman Sheikh', country: '🇵🇰', service: 'Baraat Setup' }
];

let toastIndex = 0;

function showRandomToast() {
    const data = toastData[toastIndex];
    toastIndex = (toastIndex + 1) % toastData.length;
    
    const toastContent = `
        <div class="toastify-content">
            <span class="toast-flag">${data.country}</span>
            <div class="toast-text">
                <span class="toast-name">${data.name}</span>
                <span class="toast-action">just booked ${data.service}</span>
            </div>
        </div>
    `;
    
    Toastify({
        text: toastContent,
        duration: 5000,
        close: true,
        gravity: 'bottom',
        position: 'center',
        escapeMarkup: false,
        className: 'custom-toast',
        style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '15px 20px',
            boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)'
        },
        onClick: function() {
            window.location.href = 'tel:+923067095007';
        }
    }).showToast();
}

function startToastNotifications() {
    showRandomToast();
    setInterval(showRandomToast, 8000);
}

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotSuggestions = document.getElementById('chatbotSuggestions');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotInputArea = document.getElementById('chatbotInputArea');

let chatEnded = false;
let conversationStep = 0;
let userPreferences = {
    eventType: null,
    budget: null,
    guestCount: null
};

// Chatbot responses and suggestions
const chatbotData = {
    initial: {
        message: "👋 Welcome to Shareef Sons Event Organizer! How can I assist you today?",
        suggestions: [
            "View Services",
            "Get a Quote",
            "Birthday Party",
            "Corporate Event",
            "Wedding Planning"
        ]
    },
    services: {
        message: "We offer a wide range of event planning services including:\n\n🎂 Birthday Parties\n💼 Corporate Events\n💒 Wedding Planning\n🎭 Themed Parties\n💕 Anniversary Events\n🏕️ Outdoor Events\n\nWhich service interests you?",
        suggestions: [
            "Birthday Party",
            "Corporate Event",
            "Wedding Planning",
            "Get Pricing",
            "Talk to Human"
        ]
    },
    birthday: {
        message: "🎂 Great choice! Our birthday party packages are magical! We offer:\n\n✨ Themed decorations\n🎈 Balloon arrangements\n🎪 Entertainment & games\n📸 Photography\n🍰 Custom cakes\n\nPrices start from PKR 25,000. Would you like to know more?",
        suggestions: [
            "View Packages",
            "Get Quote",
            "Book Now",
            "Other Services",
            "Talk to Human"
        ]
    },
    corporate: {
        message: "💼 Excellent! We specialize in professional corporate events including:\n\n📊 Conferences & Seminars\n🚀 Product Launches\n🏆 Award Ceremonies\n👥 Team Building Events\n\nOur corporate packages start from PKR 75,000. Interested?",
        suggestions: [
            "View Packages",
            "Get Quote",
            "Book Now",
            "Other Services",
            "Talk to Human"
        ]
    },
    wedding: {
        message: "💒 How wonderful! We make dream weddings come true! Our services include:\n\n🌸 Mehndi & Sangeet\n👰 Baraat Setup\n🎊 Walima Events\n💐 Floral Decorations\n📹 Photography & Videography\n\nPackages start from PKR 150,000. Would you like details?",
        suggestions: [
            "View Packages",
            "Get Quote",
            "Book Now",
            "Other Services",
            "Talk to Human"
        ]
    },
    packages: {
        message: "📦 Here are our popular packages:\n\n🥉 Basic Package: PKR 25,000+\n• Up to 50 guests\n• Basic decoration\n• Sound system\n\n🥈 Premium Package: PKR 75,000+\n• Up to 150 guests\n• Premium decoration\n• Photography included\n\n🥇 Luxury Package: PKR 150,000+\n• Unlimited guests\n• Full service\n• Everything included!\n\nWhich package suits you?",
        suggestions: [
            "Basic Package",
            "Premium Package",
            "Luxury Package",
            "Custom Quote",
            "Book Now"
        ]
    },
    quote: {
        message: "📝 I'd love to prepare a custom quote for you! To give you the best price, I need a few details:\n\nWhat type of event are you planning?",
        suggestions: [
            "Birthday Party",
            "Wedding Event",
            "Corporate Event",
            "Anniversary",
            "Other Event"
        ]
    },
    guestCount: {
        message: "👥 Great! Approximately how many guests are you expecting?",
        suggestions: [
            "Less than 50",
            "50 - 100",
            "100 - 200",
            "200 - 500",
            "More than 500"
        ]
    },
    budget: {
        message: "💰 What's your approximate budget range?",
        suggestions: [
            "Under PKR 50,000",
            "PKR 50,000 - 100,000",
            "PKR 100,000 - 200,000",
            "Above PKR 200,000",
            "Flexible Budget"
        ]
    },
    quoteSummary: {
        message: "✅ Perfect! Based on your requirements:\n\n📌 Event Type: {eventType}\n👥 Guests: {guestCount}\n💰 Budget: {budget}\n\nOur team will prepare a customized quote for you. Would you like to proceed?",
        suggestions: [
            "Call Now",
            "WhatsApp Us",
            "Book Consultation",
            "Start Over"
        ]
    },
    bookNow: {
        message: "🎉 Fantastic! You're one step away from your dream event!\n\nTo proceed with booking, please contact us:\n\n📞 Call: 0306-7095007\n📧 Email: Farooqg5179@gmail.com\n📍 Visit: 66 Feet Bazaar, Chowki Bazar, Mansorabad, Faisalabad\n\nWe're available 7 days a week!",
        suggestions: [
            "Call Now",
            "WhatsApp Us",
            "View Location",
            "Other Questions"
        ]
    },
    contact: {
        message: "📞 Here's how you can reach us:\n\n☎️ Phone: 0306-7095007\n📧 Email: Farooqg5179@gmail.com\n📍 Address: 66 Feet Bazaar, Chowki Bazar, Mansorabad, Faisalabad\n⏰ Hours: 9 AM - 10 PM (All Days)\n\nWe're always happy to help!",
        suggestions: [
            "Call Now",
            "WhatsApp Us",
            "Get Directions",
            "Other Questions"
        ]
    },
    human: {
        message: "👨‍💼 Of course! Our friendly team is ready to assist you personally.\n\n📞 Call us now: 0306-7095007\n\nAlternatively, you can:\n• WhatsApp us for quick response\n• Visit our office\n• Send an email\n\nWe typically respond within minutes!",
        suggestions: [
            "Call Now",
            "WhatsApp Us",
            "Send Email",
            "Continue Chat"
        ]
    },
    thanks: {
        message: "🙏 Thank you for chatting with us! We hope we could help.\n\nRemember, for the best service in Faisalabad, choose Shareef Sons Event Organizer!\n\nIs there anything else you'd like to know?",
        suggestions: [
            "View Services",
            "Get Quote",
            "Contact Us",
            "End Chat"
        ]
    },
    endChat: {
        message: "This conversation has been ended. Please contact our customer support for more details.",
        isEnded: true
    },
    default: {
        message: "I appreciate your message! 😊 To better assist you, please select one of the options below or call us directly at 0306-7095007 for immediate assistance.",
        suggestions: [
            "View Services",
            "Get Quote",
            "Book Event",
            "Contact Us",
            "Talk to Human"
        ]
    }
};

// Initialize chatbot
function initChatbot() {
    addBotMessage(chatbotData.initial.message);
    updateSuggestions(chatbotData.initial.suggestions);
}

// Add bot message
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    messageDiv.innerHTML = message.replace(/\n/g, '<br>');
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add user message
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add ended message with call button
function addEndedMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ended';
    messageDiv.innerHTML = `
        ${chatbotData.endChat.message}
        <a href="tel:+923067095007" class="chat-call-btn">
            <i class="fas fa-phone-alt"></i>
            Call Customer Support
        </a>
    `;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Disable input
    chatbotInputArea.classList.add('disabled');
    chatbotSuggestions.innerHTML = '';
    chatEnded = true;
}

// Update suggestions
function updateSuggestions(suggestions) {
    chatbotSuggestions.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.className = 'suggestion-btn';
        button.textContent = suggestion;
        button.addEventListener('click', () => handleSuggestionClick(suggestion));
        chatbotSuggestions.appendChild(button);
    });
}

// Handle suggestion click
function handleSuggestionClick(suggestion) {
    if (chatEnded) return;
    
    addUserMessage(suggestion);
    
    // Simulate typing delay
    setTimeout(() => {
        processUserInput(suggestion);
    }, 500);
}

// Process user input
function processUserInput(input) {
    const lowerInput = input.toLowerCase();
    let response;
    
    // Check for quote flow
    if (conversationStep === 1) {
        userPreferences.eventType = input;
        conversationStep = 2;
        response = chatbotData.guestCount;
    } else if (conversationStep === 2) {
        userPreferences.guestCount = input;
        conversationStep = 3;
        response = chatbotData.budget;
    } else if (conversationStep === 3) {
        userPreferences.budget = input;
        conversationStep = 0;
        
        let summaryMessage = chatbotData.quoteSummary.message
            .replace('{eventType}', userPreferences.eventType)
            .replace('{guestCount}', userPreferences.guestCount)
            .replace('{budget}', userPreferences.budget);
        
        response = {
            message: summaryMessage,
            suggestions: chatbotData.quoteSummary.suggestions
        };
    }
    // Regular responses
    else if (lowerInput.includes('service') || lowerInput.includes('view service')) {
        response = chatbotData.services;
    } else if (lowerInput.includes('birthday')) {
        response = chatbotData.birthday;
    } else if (lowerInput.includes('corporate') || lowerInput.includes('conference')) {
        response = chatbotData.corporate;
    } else if (lowerInput.includes('wedding') || lowerInput.includes('mehndi') || lowerInput.includes('walima')) {
        response = chatbotData.wedding;
    } else if (lowerInput.includes('package') || lowerInput.includes('pricing') || lowerInput.includes('price')) {
        response = chatbotData.packages;
    } else if (lowerInput.includes('quote') || lowerInput.includes('custom')) {
        conversationStep = 1;
        response = chatbotData.quote;
    } else if (lowerInput.includes('book') || lowerInput.includes('reserve')) {
        response = chatbotData.bookNow;
    } else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('location') || lowerInput.includes('direction')) {
        response = chatbotData.contact;
    } else if (lowerInput.includes('human') || lowerInput.includes('agent') || lowerInput.includes('person') || lowerInput.includes('talk')) {
        response = chatbotData.human;
    } else if (lowerInput.includes('thank') || lowerInput.includes('bye') || lowerInput.includes('ok')) {
        response = chatbotData.thanks;
    } else if (lowerInput.includes('call now') || lowerInput.includes('call')) {
        window.location.href = 'tel:+923067095007';
        response = { message: "📞 Connecting you to our team...", suggestions: ["Continue Chat", "End Chat"] };
    } else if (lowerInput.includes('whatsapp')) {
        window.open('https://wa.me/923067095007?text=Hello! I\'m interested in your event planning services.', '_blank');
        response = { message: "💬 Opening WhatsApp...", suggestions: ["Continue Chat", "End Chat"] };
    } else if (lowerInput.includes('end chat') || lowerInput.includes('close')) {
        addEndedMessage();
        return;
    } else if (lowerInput.includes('start over') || lowerInput.includes('restart') || lowerInput.includes('continue')) {
        conversationStep = 0;
        userPreferences = { eventType: null, budget: null, guestCount: null };
        response = chatbotData.initial;
    } else if (lowerInput.includes('anniversary')) {
        response = {
            message: "💕 Anniversary celebrations are our specialty! We create romantic and memorable events.\n\n🌹 Romantic decorations\n🍽️ Candlelight dinner setup\n🎵 Live music arrangements\n📸 Professional photography\n\nPackages start from PKR 35,000. Interested?",
            suggestions: ["Get Quote", "View Packages", "Book Now", "Other Services"]
        };
    } else if (lowerInput.includes('outdoor') || lowerInput.includes('garden')) {
        response = {
            message: "🏕️ Outdoor events are magical! We handle:\n\n⛺ Tent & canopy setup\n🌳 Garden decorations\n💡 Outdoor lighting\n🎪 Entertainment\n\nPerfect for any occasion! Want to know more?",
            suggestions: ["Get Quote", "View Packages", "Book Now", "Other Services"]
        };
    } else if (lowerInput.includes('basic')) {
        response = {
            message: "🥉 Basic Package (PKR 25,000+)\n\n✅ Up to 50 guests\n✅ Basic decoration\n✅ Sound system\n✅ Basic lighting\n✅ Table & chair setup\n\nPerfect for intimate gatherings! Ready to book?",
            suggestions: ["Book Basic", "Upgrade to Premium", "Get Custom Quote", "Other Packages"]
        };
    } else if (lowerInput.includes('premium')) {
        response = {
            message: "🥈 Premium Package (PKR 75,000+)\n\n✅ Up to 150 guests\n✅ Premium decoration\n✅ Professional sound\n✅ LED lighting\n✅ Photography (4 hours)\n✅ Basic catering\n\nBest value for your money! Ready to book?",
            suggestions: ["Book Premium", "Upgrade to Luxury", "Get Custom Quote", "Other Packages"]
        };
    } else if (lowerInput.includes('luxury') || lowerInput.includes('vip')) {
        response = {
            message: "🥇 Luxury Package (PKR 150,000+)\n\n✅ Unlimited guests\n✅ Luxury decoration\n✅ Premium sound & DJ\n✅ Stage & LED walls\n✅ Full photography\n✅ Premium catering\n✅ Videography & drone\n\nThe ultimate experience! Ready to book?",
            suggestions: ["Book Luxury", "Get Custom Quote", "Contact Us", "Other Packages"]
        };
    } else {
        response = chatbotData.default;
    }
    
    addBotMessage(response.message);
    updateSuggestions(response.suggestions);
}

// Scroll to bottom
function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Toggle chatbot
chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('active');
    
    if (chatbotContainer.classList.contains('active') && chatbotMessages.children.length === 0) {
        initChatbot();
    }
});

// Close chatbot
chatbotClose.addEventListener('click', function() {
    chatbotContainer.classList.remove('active');
});

// Send message on button click
chatbotSend.addEventListener('click', function() {
    sendUserMessage();
});

// Send message on Enter key
chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Send user message
function sendUserMessage() {
    const message = chatbotInput.value.trim();
    
    if (message && !chatEnded) {
        addUserMessage(message);
        chatbotInput.value = '';
        
        setTimeout(() => {
            processUserInput(message);
        }, 500);
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            
            // Show success toast
            Toastify({
                text: `
                    <div class="toastify-content">
                        <i class="fas fa-check-circle" style="font-size: 24px; color: #10b981;"></i>
                        <div class="toast-text">
                            <span class="toast-name">Message Sent!</span>
                            <span class="toast-action">We'll contact you shortly.</span>
                        </div>
                    </div>
                `,
                duration: 5000,
                close: true,
                gravity: 'bottom',
                position: 'center',
                escapeMarkup: false,
                style: {
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '16px'
                }
            }).showToast();
            
            // Reset form
            contactForm.reset();
            
        }, 2000);
    });
}

// ============================================
// FAQ ACCORDION
// ============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const isCollapsed = this.classList.contains('collapsed');
        
        // Update icon
        if (isCollapsed) {
            this.classList.remove('collapsed');
        } else {
            this.classList.add('collapsed');
        }
    });
});

// ============================================
// MOBILE MENU HANDLING
// ============================================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                    document.body.classList.remove('no-scroll');
                }
            }
        }
    });
}

// ============================================
// CURRENT YEAR IN FOOTER
// ============================================
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ============================================
// HERO PARTICLES
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, -100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

createParticles();

// ============================================
// LAZY LOADING IMAGES
// ============================================
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// REVEAL ANIMATIONS ON SCROLL
// ============================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

initRevealAnimations();

// ============================================
// VIBRATING CALL BUTTON
// ============================================
const vibratingBtn = document.querySelector('.call-btn.vibrate');

if (vibratingBtn) {
    // Stop vibration on hover
    vibratingBtn.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
    });
    
    vibratingBtn.addEventListener('mouseleave', function() {
        this.style.animation = 'vibrate 0.5s infinite';
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for heavy operations
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll handlers
const optimizedScrollHandler = throttle(function() {
    handleNavbarScroll();
    handleActiveNav();
}, 100);

window.removeEventListener('scroll', handleNavbarScroll);
window.removeEventListener('scroll', handleActiveNav);
window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// SERVICE WORKER REGISTRATION (Optional)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c🎉 Shareef Sons Event Organizer', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%c📞 Contact: 0306-7095007', 'font-size: 14px; color: #764ba2;');
console.log('%c🌐 Designed & Developed by Dilawar Pro', 'font-size: 12px; color: #f093fb;');
console.log('%c🔗 https://dilawarpro.com', 'font-size: 12px; color: #667eea;');

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.message);
});

// ============================================
// DOCUMENT READY STATE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Add body class for animations
    document.body.classList.add('loaded');
    
    // Initialize all components
    try {
        // Components already initialized above
        console.log('All components initialized.');
    } catch (error) {
        console.error('Error initializing components:', error);
    }
});