// Splash fade
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('splash').classList.add('hidden'), 500);
});

// Mobile nav toggle
const burger = document.querySelector('.hamburger');
const links  = document.querySelector('.nav-links');
burger?.addEventListener('click', () => links.classList.toggle('show'));

// Theme toggle with memory
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
  updateThemeIcon();
});
function updateThemeIcon(){
  themeToggle.textContent = root.getAttribute('data-theme') === 'light' ? '🌞' : '🌙';
}

// Scroll reveal (progressive enhancement—content is visible by default)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.remove('hidden');
      observer.unobserve(e.target);
    }
  });
},{ threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el=>{
  el.classList.add('hidden');
  observer.observe(el);
});

// Contact (simple validation + mailto)
const form = document.getElementById('contactForm');
const msg  = document.getElementById('formMsg');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(!name || !email || !message){
    msg.style.color = '#ffb3b3';
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    msg.style.color = '#ffb3b3';
    msg.textContent = 'Please enter a valid email.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio Inquiry - ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
  window.location.href = `mailto:spradeepthi10@gmail.com?subject=${subject}&body=${body}`;

  msg.style.color = '#7cffc9';
  msg.textContent = 'Opening your email app…';
  setTimeout(()=>form.reset(), 800);
});
