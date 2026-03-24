const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function initStars() {
  stars = [];
  for(let i=0; i<150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      alpha: Math.random()
    });
  }
}

function drawStars() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Normal stars visible more in dark mode
  ctx.fillStyle = isDark ? '#ffffff' : 'rgba(0, 0, 0, 0.2)';
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
    s.alpha += (Math.random() - 0.5) * 0.05;
    if(s.alpha < 0) s.alpha = 0;
    if(s.alpha > 1) s.alpha = 1;
  });
  
  // Draw shooting stars
  shootingStars.forEach((ss, index) => {
    ctx.globalAlpha = ss.life;
    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(ss.x - ss.length * Math.cos(ss.angle), ss.y - ss.length * Math.sin(ss.angle));
    
    // Using color 1 (#f2ed64) and color 2 (#3ad4f2) for stars
    ctx.strokeStyle = Math.random() > 0.5 ? '#3ad4f2' : '#f2ed64';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ss.x += ss.speed * Math.cos(ss.angle);
    ss.y += ss.speed * Math.sin(ss.angle);
    ss.life -= 0.02;
    
    if(ss.life <= 0 || ss.x > canvas.width || ss.y > canvas.height) {
      shootingStars.splice(index, 1);
    }
  });
  
  // Add new shooting stars
  if(Math.random() < 0.08) {
    shootingStars.push({
      x: Math.random() * canvas.width * 0.8,
      y: Math.random() * canvas.height * 0.3,
      length: Math.random() * 80 + 20,
      speed: Math.random() * 15 + 8,
      angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
      life: 1
    });
  }
  
  requestAnimationFrame(drawStars);
}

initStars();
drawStars();

// Ripple effect
document.querySelectorAll('.btn-ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    let rect = this.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    let ripples = document.createElement('span');
    ripples.className = 'ripple';
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    let size = Math.max(rect.width, rect.height);
    ripples.style.width = size + 'px';
    ripples.style.height = size + 'px';
    // adjusting position to be centered around click
    ripples.style.marginLeft = -(size / 2) + 'px';
    ripples.style.marginTop = -(size / 2) + 'px';
    
    this.appendChild(ripples);
    setTimeout(() => {
      ripples.remove();
    }, 600);
  });
});

// Theme toggle
const themeToggleBtn = document.getElementById('themeToggleBtn');
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  themeToggleBtn.innerHTML = newTheme === 'dark' ? '☀️ روشن' : '🌙 تاریک';
});

// Form submission handler
function handleSubmit() {
  alert('آپ کا پیغام موصول ہوگیا! ہم جلد رابطہ کریں گے۔\nشکریہ!');
}

// Nav active indicator behavior on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if(window.pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href').includes(current) && current !== '') {
      link.classList.add('active');
    }
  });
});
