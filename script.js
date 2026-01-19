document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const openBtn = document.getElementById('open-menu');
  const closeBtn = document.getElementById('close-menu');
  const overlay = document.getElementById('mobile-overlay');
  const themeBtn = document.getElementById('theme-btn');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');
  const backToTop = document.getElementById('backToTop');

  // Sidebar Toggle
  const toggleSidebar = (state) => {
    sidebar.classList.toggle('active', state);
    overlay.classList.toggle('active', state);
    document.body.style.overflow = state ? 'hidden' : '';
  };

  openBtn.addEventListener('click', () => toggleSidebar(true));
  closeBtn.addEventListener('click', () => toggleSidebar(false));
  overlay.addEventListener('click', () => toggleSidebar(false));

  // Close sidebar on link click
  document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.addEventListener('click', () => toggleSidebar(false));
  });

  // Active Section Tracker & Progress Bar
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

  // Theme Toggle
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeBtn.querySelector('i').className = isLight ? 'bx bx-sun' : 'bx bx-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.querySelector('i').className = 'bx bx-sun';
  }

  // Nepal Time Clock
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

  // Scroll Reveal Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Stagger animation for child elements
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

  // Form Submission
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
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // Simulate API call (replace with your actual endpoint)
    try {
      // Replace this with your actual form submission logic
      // For Web3Forms, you would use their API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      formMsg.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
      formMsg.className = 'center success';
      form.reset();
      
      setTimeout(() => {
        btnText.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 2000);
      
      setTimeout(() => {
        formMsg.style.display = 'none';
      }, 5000);
      
    } catch (error) {
      // Error
      formMsg.textContent = '✗ Failed to send message. Please try again.';
      formMsg.className = 'center error';
      btnText.textContent = 'Send Message';
      submitBtn.disabled = false;
      
      setTimeout(() => {
        formMsg.style.display = 'none';
      }, 5000);
    }
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

