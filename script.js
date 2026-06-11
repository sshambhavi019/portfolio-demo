// 1. Structural Viewport Loader Configuration
window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
    initCounters();
    animateSkills();
});

// 2. Custom Glowing Pointer Mapping Engine
const glow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// 3. Scroll Tracker Progress Bar & BTT Action Handle Visibility
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalScroll) * 100;
    document.getElementById('scroll-progress').style.width = progress + '%';

    if (window.pageYOffset > 400) btt.classList.add('show');
    else btt.classList.remove('show');

    handleActiveNavLinks();
});
btt.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// 4. Automated Contextual Typewriter Engine
const phrases = ["Software Engineer", "Full Stack Developer", "Android Developer", "Backend Developer"];
let i = 0, j = 0, currentPhrase = [], isDeleting = false;
function loopPhrases() {
    const target = document.getElementById('typing-text');
    if(!target) return;
    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]); j++;
            target.innerHTML = currentPhrase.join("");
        }
        if(isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(); j--;
            target.innerHTML = currentPhrase.join("");
        }
        if (j == phrases[i].length) { isDeleting = true; }
        if (isDeleting && j == 0) { currentPhrase = []; isDeleting = false; i++; if (i == phrases.length) i = 0; }
    }
    setTimeout(loopPhrases, isDeleting ? 60 : 120);
}
document.addEventListener("DOMContentLoaded", () => setTimeout(loopPhrases, 1000));

// 5. Intersection Observer Layout Animation Configurations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if(entry.target.id === 'skills') animateSkills();
        }
    });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

function animateSkills() {
    document.querySelectorAll('.progress-fill').forEach(bar => bar.style.width = bar.getAttribute('data-width'));
}

// 6. Interactive Count Statistic Recalibrations
function initCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 40;
        const updateCount = () => {
            const inc = target / speed;
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 30);
            } else { counter.innerText = target + "+"; }
        };
        updateCount();
    });
}

// 7. Dynamic Project Filtering Module
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) card.classList.remove('hide');
            else card.classList.add('hide');
        });
    });
});

// 8. Adaptive Mobile Navigation Component Interfaces
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-item').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));

function handleActiveNavLinks() {
    let fromTop = window.scrollY + 120;
    document.querySelectorAll('.nav-item').forEach(link => {
        let section = document.querySelector(link.hash);
        if(section) {
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
            } else { link.classList.remove('active'); }
        }
    });
}

// 9. Low-Footprint Canvas Particle Generator Background Scheme
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particlesArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 60; i++) particlesArray.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// 10. Formspree Asynchronous AJAX Handling Engine
const contactForm = document.getElementById('portfolio-contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Stop standard browser page redirection
        
        const statusBox = document.getElementById('form-status-message');
        const submitBtn = document.getElementById('form-submit-btn');
        const formData = new FormData(contactForm);
        
        // Show sending state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Message... <i class="fas fa-spinner fa-spin"></i>';
        
        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success Scenario
                statusBox.className = 'success';
                statusBox.innerHTML = '✨ Message sent successfully! I will reach out shortly.';
                contactForm.reset(); // Clear all user inputs
            } else {
                // Error Response from Server
                const errorData = await response.json();
                statusBox.className = 'error';
                statusBox.innerHTML = errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your form.';
            }
        } catch (error) {
            // General Network/Connectivity Error Scenario
            statusBox.className = 'error';
            statusBox.innerHTML = 'Network error. Please verify your connection and try again.';
        } finally {
            // Reset Button to normal state
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Secure Message <i class="fas fa-paper-plane"></i>';
        }
    });
}