# 🚀 Dhananjay Sah - Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer. Built with vanilla HTML, CSS, and JavaScript with a focus on performance, accessibility, and stunning visual design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Design & UI/UX
- **Modern Glassmorphism Design** - Contemporary glass-effect UI with blur and transparency
- **Dark/Light Theme Toggle** - Seamless theme switching with preference persistence
- **Smooth Animations** - Professional scroll animations and transitions
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Animated Background** - Subtle pulsing gradient effects for visual appeal

### 📱 Mobile Experience
- **Slide-in Sidebar Navigation** - Smooth mobile menu with overlay
- **Touch-Optimized** - Large tap targets and gesture-friendly interface
- **Adaptive Layouts** - Content reflows beautifully on all screen sizes
- **Performance Optimized** - Fast loading and smooth scrolling on mobile devices

### ⚡ Functionality
- **Active Section Tracking** - Navigation highlights current section automatically
- **Scroll Progress Bar** - Visual indicator of page scroll position
- **Back to Top Button** - Quick navigation to top of page
- **Live Clock** - Real-time Nepal Time (NPT) display
- **Working Contact Form** - Integrated with Web3Forms for email notifications
- **Form Validation** - Client-side validation with user-friendly error messages
- **Intersection Observer** - Efficient scroll-triggered animations
- **Stagger Animations** - Sequential reveal effects for grid items

### 🛡️ Additional Features
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation support
- **Cross-Browser Compatible** - Works on all modern browsers
- **No Dependencies** - Pure vanilla JavaScript, no frameworks needed
- **Fast Performance** - Optimized CSS and minimal JavaScript
- **Spam Protection** - Honeypot field in contact form

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure and content |
| CSS3 | Styling, animations, and glassmorphism |
| JavaScript (ES6+) | Interactivity and dynamic functionality |
| [Boxicons](https://boxicons.com/) | Beautiful icon set |
| [Devicon](https://devicon.dev/) | Technology stack icons |
| [Google Fonts](https://fonts.google.com/) | Plus Jakarta Sans typography |
| [Web3Forms](https://web3forms.com/) | Contact form backend |

## 📦 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript

### Quick Start

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
```

2. **Open the project**
```bash
   # Using VS Code
   code .
   
   # Or open index.html directly in your browser
```

3. **Configure Web3Forms**
   - Visit [Web3Forms](https://web3forms.com)
   - Sign up and get your free access key
   - Open `script.js`
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual key:
```javascript
   const WEB3FORMS_ACCESS_KEY = 'your-actual-key-here';
```

4. **Update Personal Information**
   - Edit `index.html` to add your details
   - Update social media links in the footer
   - Modify project descriptions and skills
   - Add your email in the footer

5. **Launch**
   - Open `index.html` in your browser
   - Or use a local server (recommended):
```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   Right-click index.html → Open with Live Server
```

## 📁 Project Structure
```
portfolio/
│
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
│
└── assets/             # (Optional) Images and resources
    ├── images/
    └── documents/
```

## 🎨 Customization Guide

### Changing Colors

Edit the CSS variables in `style.css`:
```css
:root {
  --primary: #8b5cf6;      /* Purple - Main brand color */
  --accent: #06b6d4;       /* Cyan - Secondary color */
  --success: #10b981;      /* Green - Success states */
  /* ... more variables */
}
```

### Adding New Sections

1. Add HTML in `index.html`:
```html
<section id="new-section" class="section">
  <div class="container">
    <h2 class="section-title scroll-reveal">Your <span class="gradient-text">Title</span></h2>
    <!-- Your content -->
  </div>
</section>
```

2. Add navigation link:
```html
<li><a href="#new-section" class="nav-item"><i class='bx bx-icon'></i><span>Label</span></a></li>
```

### Adding Projects

Duplicate the project card in `index.html`:
```html
<div class="project-card glass stagger-item">
  <div class="p-icon"><i class='bx bx-your-icon'></i></div>
  <div class="p-info">
    <h3>Project Name</h3>
    <p>Project description goes here.</p>
    <div class="p-tags">
      <span>Tech1</span>
      <span>Tech2</span>
    </div>
  </div>
</div>
```

### Adding Skills

Add new skill cards in the skills section:
```html
<div class="skill-card glass stagger-item">
  <i class="devicon-technology-plain colored"></i>
  <span>Technology Name</span>
</div>
```

Find icons at [Devicon](https://devicon.dev/)

## 🚀 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main`) and folder (`/root`)
4. Click Save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Sign up at [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder
3. Or connect your GitHub repository
4. Site deploys automatically

### Vercel

1. Sign up at [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Click Deploy
4. Done!

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari | ✅ Latest 2 versions |
| Edge | ✅ Latest 2 versions |
| Opera | ✅ Latest 2 versions |

## 🐛 Known Issues

- **Theme preference**: Currently stored in localStorage (won't sync across devices)
- **Form submission**: Requires active internet connection
- **Animations**: May not work on older browsers without IntersectionObserver support

## 🔄 Future Enhancements

- [ ] Add blog section
- [ ] Implement project filtering by technology
- [ ] Add testimonials section
- [ ] Create admin panel for content updates
- [ ] Add multilingual support
- [ ] Integrate Google Analytics
- [ ] Add loading screen animation
- [ ] Implement PWA features
- [ ] Add resume download button
- [ ] Create case studies for projects

## 📄 License

This project is licensed under the MIT License - see below for details:
```
MIT License

Copyright (c) 2026 - Dhananjay Sah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Dhananjay Sah**
- GitHub: [@dhananjaysah46](https://github.com/dhananjaysah46)
- LinkedIn: [Dhananjay Sah](https://linkedin.com/in/dhananjaysah.46)
- Email: dhananjaysah07@email.com

## 🙏 Acknowledgments

- [Boxicons](https://boxicons.com/) for the beautiful icon set
- [Devicon](https://devicon.dev/) for technology icons
- [Web3Forms](https://web3forms.com/) for the contact form service
- [Google Fonts](https://fonts.google.com/) for Plus Jakarta Sans font
- Inspiration from various portfolio designs on Dribbble and Behance

## 📞 Support

If you have any questions or run into issues, feel free to:
- Open an [issue](https://github.com/yourusername/portfolio/issues)
- Contact me via [email](mailto:dhananjaysah07@gmail.com)
- Connect on [LinkedIn](https://linkedin.com/in/yourprofile)

## ⭐ Show Your Support

If you found this portfolio template helpful, please give it a ⭐ on GitHub!

---

<div align="center">
  <p>Made with ❤️ by Dhananjay Sah</p>
  <p>© 2026 - All Rights Reserved</p>
</div>
