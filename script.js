// Animate skill bars on scroll
document.addEventListener("DOMContentLoaded", function() {
  function animateSkills() {
    const skills = document.querySelectorAll('.skill-level');
    skills.forEach(skill => {
      const level = skill.getAttribute('data-level');
      skill.style.width = level + '%';
    });
  }

  // Skill animation when skills section enters viewport
  let skillsSection = document.querySelector('.skills');
  let animated = false;
  window.addEventListener('scroll', function() {
    const rect = skillsSection.getBoundingClientRect();
    if (!animated && rect.top < window.innerHeight - 100) {
      animateSkills();
      animated = true;
    }
  });

  // Contact form alert
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
    contactForm.reset();
  });
});

