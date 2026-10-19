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

// Smooth scroll to sections
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
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
