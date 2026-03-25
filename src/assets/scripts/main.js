  // ========== FADE SLIDESHOW ==========
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let autoInterval;
  const dotsContainer = document.getElementById('sliderDots');
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active-dot');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.dot');

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active-dot');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active-dot');
    resetAutoTimer();
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function resetAutoTimer() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => nextSlide(), 5000);
  }

  document.getElementById('nextSlide').addEventListener('click', nextSlide);
  document.getElementById('prevSlide').addEventListener('click', prevSlide);
  const hero = document.querySelector('.hero-slideshow');
  hero.addEventListener('mouseenter', () => clearInterval(autoInterval));
  hero.addEventListener('mouseleave', resetAutoTimer);
  resetAutoTimer();

  // ========== VIDEO COLLECTION WITH LOAD MORE ==========
  // Full list of videos (valid YouTube IDs)
  const allVideos = [
    { id: "sXz4P7_6s2M", title: "Cinematic Reel 2024", description: "A showcase of recent film projects – fashion, travel, and weddings." },
    { id: "tgbNymZ7vqY", title: "Golden Hour Sessions", description: "Behind the scenes of a sunset editorial shoot in Tuscany." },
    { id: "L_jWHffIx5E", title: "Wedding Film | Elena & Marco", description: "Highlights from an intimate destination wedding in Santorini." },
    { id: "Vw4KVoEVcr0", title: "Brand Story: Atelier Lumière", description: "A fashion film celebrating craftsmanship and light." },
    { id: "K4DyBUG242c", title: "Documentary Short | The Potter", description: "A portrait of an artisan, capturing the beauty of handmade ceramics." },
    { id: "9bZkp7q19f0", title: "Dance Film | Movement Study", description: "A collaboration with contemporary dancers exploring fluidity." },
    { id: "M7FIvfx5J10", title: "Travel Diary: Kyoto", description: "Visual meditation on the streets of Kyoto." },
    { id: "YQHsXMglC9A", title: "Fashion Editorial", description: "High‑end editorial for Vogue Italia." }
  ];

  const initialCount = 3;
  let visibleCount = initialCount;
  const videoGrid = document.getElementById('videoGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  function createVideoCard(video) {
    // Create anchor that opens YouTube in new tab
    const card = document.createElement('a');
    card.className = 'video-card';
    card.href = `https://www.youtube.com/watch?v=${video.id}`;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'video-thumb';
    const img = document.createElement('img');
    img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    img.alt = video.title;
    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = '<i class="fas fa-play"></i>';
    thumbDiv.appendChild(img);
    thumbDiv.appendChild(playIcon);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'video-info';
    infoDiv.innerHTML = `<h3>${video.title}</h3><p>${video.description}</p>`;

    card.appendChild(thumbDiv);
    card.appendChild(infoDiv);
    return card;
  }

  function renderVideos() {
    videoGrid.innerHTML = '';
    const visibleVideos = allVideos.slice(0, visibleCount);
    visibleVideos.forEach(video => {
      videoGrid.appendChild(createVideoCard(video));
    });
    if (visibleCount >= allVideos.length) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }

  function loadMore() {
    visibleCount = Math.min(visibleCount + 3, allVideos.length);
    renderVideos();
  }

  loadMoreBtn.addEventListener('click', loadMore);
  renderVideos();

  // ========== NAVBAR HIDE ON SCROLL ==========
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 80) navbar.classList.add('hidden-nav');
    else if (currentScroll < lastScroll) navbar.classList.remove('hidden-nav');
    lastScroll = currentScroll;
  });

  // ========== MOBILE MENU ==========
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    if (!name || !email) {
      alert('Please enter your name and email.');
      return;
    }
    alert(`Thank you, ${name}! I'll be in touch soon.`);
    contactForm.reset();
  });

  // ========== SMOOTH SCROLL OFFSET ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
      }
    });
  });