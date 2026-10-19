// Chris Driscoll Plumbing - Interactive Features

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const message = form.querySelector('textarea[name="message"]').value;
    
    // Log form data (in production, this would send to a backend)
    console.log('Contact Message:', {
        name: name,
        phone: phone,
        message: message,
        timestamp: new Date().toISOString()
    });
    
    // Show confirmation message
    alert(`Thanks, ${name}! We'll contact you at ${phone} to discuss your plumbing needs.`);
    
    // Reset form
    form.reset();
}

// Update header offset CSS variable based on actual header height
function updateHeaderOffset() {
    const header = document.querySelector('.header');
    if (header) {
        const headerHeight = header.getBoundingClientRect().height;
        const offset = headerHeight + 16; // 16px breathing room
        document.documentElement.style.setProperty('--header-offset', `${offset}px`);
    }
}

// Initialize dynamic header offset on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Update header offset on page load
    updateHeaderOffset();
    
    // Set up ResizeObserver to update on header resize (if supported)
    if (window.ResizeObserver) {
        const header = document.querySelector('.header');
        if (header) {
            const resizeObserver = new ResizeObserver(updateHeaderOffset);
            resizeObserver.observe(header);
        }
    }
    
    // Attach form submit handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .benefit-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});
