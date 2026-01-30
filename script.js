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

  // ==================== SECURITY: INPUT SANITIZATION ====================
  function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function validateName(name) {
    // Only allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    return nameRegex.test(name);
  }

  function validateMessage(message) {
    // Check length and disallow suspicious patterns
    if (message.length < 10 || message.length > 500) return false;
    
    // Block common injection patterns
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /eval\(/i,
      /expression\(/i
    ];
    
    return !suspiciousPatterns.some(pattern => pattern.test(message));
  }

  // ==================== SECURITY: RATE LIMITING ====================
  let lastSubmitTime = 0;
  const SUBMIT_COOLDOWN = 5000; // 5 seconds between submissions

  function canSubmitForm() {
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
      return false;
    }
    lastSubmitTime = now;
    return true;
  }

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
    toast.textContent = sanitizeInput(message); // Sanitize toast messages
    
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

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });

    mobileNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });

    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
    
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
      const hasResume = downloadBtn.getAttribute('href') !== '#';
      
      if (!hasResume) {
        e.preventDefault();
        showToast('Resume will be available soon!', 'error');
      } else {
        showToast('Downloading resume...', 'success');
      }
    });
  }

  // ==================== FORM VALIDATION WITH SECURITY ====================
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const messageInput = document.getElementById('message-input');
  const charCounter = document.querySelector('.char-counter');

  // Name validation with security
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      
      if (validateName(value)) {
        nameInput.classList.add('valid');
        nameInput.classList.remove('invalid');
      } else if (value.length > 0) {
        nameInput.classList.add('invalid');
        nameInput.classList.remove('valid');
      } else {
        nameInput.classList.remove('valid', 'invalid');
      }
    });

    // Prevent paste of malicious content
    nameInput.addEventListener('paste', (e) => {
      setTimeout(() => {
        const value = nameInput.value.trim();
        if (!validateName(value)) {
          nameInput.value = value.replace(/[^a-zA-Z\s'-]/g, '');
        }
      }, 0);
    });
  }

  // Email validation
  if (emailInput) {
    emailInput.addEventListener('input', (e) => {
      const value = e.target.value.trim();
      
      if (validateEmail(value)) {
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

  // Message validation with character counter
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

  // ==================== SECURE FORM SUBMISSION ====================
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const formMsg = document.getElementById('form-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Rate limiting check
    if (!canSubmitForm()) {
      showToast('Please wait before sending another message', 'error');
      return;
    }

    // Get form data
    const rawName = nameInput.value.trim();
    const rawEmail = emailInput.value.trim();
    const rawMessage = messageInput.value.trim();

    // Validate all inputs
    if (!validateName(rawName)) {
      showToast('Please enter a valid name (2-50 characters, letters only)', 'error');
      nameInput.focus();
      return;
    }

    if (!validateEmail(rawEmail)) {
      showToast('Please enter a valid email address', 'error');
      emailInput.focus();
      return;
    }

    if (!validateMessage(rawMessage)) {
      showToast('Message must be 10-500 characters and contain no suspicious content', 'error');
      messageInput.focus();
      return;
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(rawName);
    const sanitizedEmail = sanitizeInput(rawEmail);
    const sanitizedMessage = sanitizeInput(rawMessage);

    // Disable button
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';

    // Web3Forms access key
    const WEB3FORMS_ACCESS_KEY = '64f1d5c8-b451-45de-b0e0-7c55d8dbadb9';
    
    const object = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      // Add honeypot field for spam protection
      botcheck: false
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
        formMsg.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        formMsg.className = 'center success';
        showToast('Message sent successfully!', 'success');
        form.reset();
        
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

  // ==================== DEVELOPER TOOLS PROTECTION (COSMETIC ONLY) ====================
  
  // Disable right-click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showToast('⚠️ Right-click is disabled', 'error');
    return false;
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
  document.addEventListener('keydown', (e) => {
    // F12 - Developer Tools
    if (e.key === 'F12') {
      e.preventDefault();
      showToast('⚠️ Developer tools are disabled', 'error');
      return false;
    }
    
    // Ctrl+Shift+I - Inspect Element
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      showToast('⚠️ Inspect element is disabled', 'error');
      return false;
    }
    
    // Ctrl+Shift+J - Console
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      showToast('⚠️ Console is disabled', 'error');
      return false;
    }
    
    // Ctrl+Shift+C - Inspect Element (alternate)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      showToast('⚠️ Inspect element is disabled', 'error');
      return false;
    }
    
    // Ctrl+U - View Source
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      showToast('⚠️ View source is disabled', 'error');
      return false;
    }
    
    // Ctrl+S - Save Page
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      showToast('⚠️ Saving page is disabled', 'error');
      return false;
    }

    // Ctrl+Shift+K - Firefox Console
    if (e.ctrlKey && e.shiftKey && e.key === 'K') {
      e.preventDefault();
      return false;
    }

    // Command+Option+I (Mac)
    if (e.metaKey && e.altKey && e.key === 'i') {
      e.preventDefault();
      return false;
    }

    // Command+Option+J (Mac)
    if (e.metaKey && e.altKey && e.key === 'j') {
      e.preventDefault();
      return false;
    }

    // Command+Option+C (Mac)
    if (e.metaKey && e.altKey && e.key === 'c') {
      e.preventDefault();
      return false;
    }
  });

  // Disable text selection
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.mozUserSelect = 'none';
  document.body.style.msUserSelect = 'none';

  // Disable drag
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Detect DevTools opening (basic detection)
  let devtoolsOpen = false;
  const threshold = 160;

  const detectDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
      devtoolsOpen = true;
      // Optionally redirect or show warning
      showToast('⚠️ Please close developer tools', 'error');
      
      // Uncomment below to blur content when devtools detected
      // document.body.style.filter = 'blur(10px)';
      
      // Uncomment below to redirect
      // window.location.href = 'about:blank';
    } else if (!widthThreshold && !heightThreshold && devtoolsOpen) {
      devtoolsOpen = false;
      // document.body.style.filter = 'none';
    }
  };

  // Check every second
  setInterval(detectDevTools, 1000);

  // Advanced: Detect DevTools via console
  const devToolsChecker = () => {
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        devtoolsOpen = true;
        showToast('⚠️ Developer tools detected!', 'error');
        // Optional: Blur or redirect here
      }
    });
    console.log(element);
  };

  // Run devtools checker periodically
  setInterval(devToolsChecker, 2000);

  // Disable copy
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    showToast('⚠️ Copying is disabled', 'error');
    return false;
  });

  // Disable cut
  document.addEventListener('cut', (e) => {
    e.preventDefault();
    showToast('⚠️ Cutting is disabled', 'error');
    return false;
  });

  // Clear console periodically
  setInterval(() => {
    console.clear();
  }, 5000);

  // Override console methods
  console.log = function() {};
  console.warn = function() {};
  console.error = function() {};
  console.info = function() {};
  console.debug = function() {};

  // Display warning in console before override
  const originalLog = console.log;
  setTimeout(() => {
    originalLog('%c🚨 SECURITY WARNING', 'color: red; font-size: 30px; font-weight: bold;');
    originalLog('%cThis website is protected. Unauthorized access attempts are logged.', 'font-size: 16px;');
    originalLog('%c⚠️ If someone told you to paste code here, DO NOT DO IT. It is a scam.', 'color: orange; font-size: 14px;');
  }, 100);
});