document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const openBtn = document.getElementById('open-menu');
  const closeBtn = document.getElementById('close-menu');
  const overlay = document.getElementById('mobile-overlay');
  const themeBtn = document.getElementById('theme-btn');
  const navItems = document.querySelectorAll('.nav-item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const sections = document.querySelectorAll('section');
  const backToTop = document.getElementById('backToTop');
  const preloader = document.getElementById('preloader');

  // ==================== PRELOADER ====================
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.cursor = 'auto';
    }, 1500);
  });

  // ==================== CUSTOM CURSOR ====================
  const cursor = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
      });
    });

    document.addEventListener('mousedown', () => {
      cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('click');
    });
  }

  // ==================== PARTICLE ANIMATION ====================
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  
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
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) {
        this.speedX *= -1;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY *= -1;
      }
    }

    draw() {
      ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = [];
  const particleCount = window.innerWidth > 768 ? 50 : 30;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // ==================== TOAST NOTIFICATIONS ====================
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==================== SIDEBAR TOGGLE ====================
  const toggleSidebar = (state) => {
    sidebar.classList.toggle('active', state);
    overlay.classList.toggle('active', state);
    document.body.style.overflow = state ? 'hidden' : '';
  };

  openBtn.addEventListener('click', () => toggleSidebar(true));
  closeBtn.addEventListener('click', () => toggleSidebar(false));
  overlay.addEventListener('click', () => toggleSidebar(false));

  document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.addEventListener('click', () => toggleSidebar(false));
  });

  // ==================== ACTIVE SECTION TRACKER ====================
  window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    // Update desktop nav
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });

    // Update mobile bottom nav
    mobileNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });

    // Progress Bar
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
    
    // Back to Top Button
    if (window.scrollY > 500) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== THEME TOGGLE ====================
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeBtn.querySelector('i').className = isLight ? 'bx bx-sun' : 'bx bx-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    showToast(`${isLight ? 'Light' : 'Dark'} theme activated`, 'success');
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.querySelector('i').className = 'bx bx-sun';
  }

  // ==================== NEPAL TIME CLOCK ====================
  const updateTime = () => {
    const time = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date());
    document.getElementById('local-time').textContent = time;
  };
  updateTime();
  setInterval(updateTime, 1000);

  // ==================== SCROLL REVEAL OBSERVER ====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        const staggers = entry.target.querySelectorAll('.stagger-item');
        staggers.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('active');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal, .reveal-container').forEach(el => {
    observer.observe(el);
  });

  // ==================== RESUME DOWNLOAD ====================
  const downloadBtn = document.getElementById('download-resume');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      // If you don't have a resume file yet, prevent download and show message
      const hasResume = downloadBtn.getAttribute('href') !== '#';
      
      if (!hasResume) {
        e.preventDefault();
        showToast('Resume will be available soon!', 'error');
      } else {
        showToast('Downloading resume...', 'success');
      }
    });
  }

  // ==================== FORM VALIDATION ====================
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const messageInput = document.getElementById('message-input');
  const charCounter = document.querySelector('.char-counter');

  // Name validation
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      if (value.length >= 2) {
        nameInput.classList.add('valid');
        nameInput.classList.remove('invalid');
      } else if (value.length > 0) {
        nameInput.classList.add('invalid');
        nameInput.classList.remove('valid');
      } else {
        nameInput.classList.remove('valid', 'invalid');
      }
    });
  }

  // Email validation
  if (emailInput) {
    emailInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (emailRegex.test(value)) {
        emailInput.classList.add('valid');
        emailInput.classList.remove('invalid');
      } else if (value.length > 0) {
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
      } else {
        emailInput.classList.remove('valid', 'invalid');
      }
    });
  }

  // Character counter
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', (e) => {
      const count = e.target.value.length;
      charCounter.textContent = `${count}/500`;
      
      if (count > 450) {
        charCounter.style.color = 'var(--error)';
      } else {
        charCounter.style.color = 'var(--text-dim)';
      }
    });
  }

  // ==================== FORM SUBMISSION ====================
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const formMsg = document.getElementById('form-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable button
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';

    // Get form data
    const formData = new FormData(form);
    
    // Add your Web3Forms access key here
    const WEB3FORMS_ACCESS_KEY = '64f1d5c8-b451-45de-b0e0-7c55d8dbadb9';
    
    const object = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (result.success) {
        // Success
        formMsg.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        formMsg.className = 'center success';
        showToast('Message sent successfully!', 'success');
        form.reset();
        
        // Reset validation states
        nameInput.classList.remove('valid', 'invalid');
        emailInput.classList.remove('valid', 'invalid');
        charCounter.textContent = '0/500';
        
        setTimeout(() => {
          btnText.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 2000);
        
        setTimeout(() => {
          formMsg.style.display = 'none';
        }, 5000);
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      formMsg.textContent = '✗ Failed to send message. Please try again.';
      formMsg.className = 'center error';
      showToast('Failed to send message. Please try again.', 'error');
      btnText.textContent = 'Send Message';
      submitBtn.disabled = false;
      
      setTimeout(() => {
        formMsg.style.display = 'none';
      }, 5000);
    }
  });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==================== PROJECT CARD HOVER EFFECTS ====================
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) rotateX(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0)';
    });
  });

  // ==================== RIPPLE EFFECT ON BUTTONS ====================
  document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ==================== PARALLAX EFFECT ON HERO ====================
  const heroContent = document.querySelector('.hero-content');
  
  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      if (heroContent) {
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
  }

  // ==================== TECH STACK ANIMATION ====================
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // ==================== CONSOLE MESSAGE ====================
  console.log('%c👋 Hello Developer!', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
  console.log('%cLooking to collaborate? Let\'s connect!', 'color: #06b6d4; font-size: 14px;');
  console.log('%cPortfolio built with ❤️ by Dhananjay Sah', 'color: #94a3b8; font-size: 12px;');

  // ==================== EASTER EGG ====================
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
      showToast('🎮 Konami Code Activated! You found the Easter Egg!', 'success');
      document.body.style.animation = 'rainbow 2s linear infinite';
    }
  });

  const rainbowStyle = document.createElement('style');
  rainbowStyle.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(rainbowStyle);
});