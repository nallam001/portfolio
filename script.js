/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* =============================================
   TYPED TEXT ANIMATION
   ============================================= */
const texts = [
  'Backend Developer',
  'REST API Architect',
  'MEAN Stack Engineer',
  'Node.js Developer',
  'Full-Stack Builder',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    typedEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling index
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 400);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* =============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* =============================================
   HAMBURGER MENU
   ============================================= */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  // Simple mobile menu toggle — could expand with a proper drawer
});

/* =============================================
   CONTACT FORM — MAILTO HANDLER
   ============================================= */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:abdelrahmanallam134@gmail.com?subject=${subject}&body=${body}`;

  const btn = document.getElementById('submit-btn');
  btn.innerHTML = `<span>Message Sent ✓</span>`;
  btn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
  setTimeout(() => {
    btn.innerHTML = `<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

/* =============================================
   SMOOTH CURSOR TRAIL (subtle)
   ============================================= */
const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(trail);

document.addEventListener('mousemove', (e) => {
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
});

/* =============================================
   CODE CARD — ANIMATED TYPING
   ============================================= */
// Add a subtle glow pulse to the code card
const codeCard = document.querySelector('.code-card');
if (codeCard) {
  setInterval(() => {
    codeCard.style.boxShadow = '0 8px 48px rgba(0,0,0,0.6), 0 0 60px rgba(56,189,248,0.2)';
    setTimeout(() => {
      codeCard.style.boxShadow = '0 8px 48px rgba(0,0,0,0.6), 0 0 40px rgba(56,189,248,0.1)';
    }, 1000);
  }, 2000);
}
