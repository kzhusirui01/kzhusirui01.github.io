(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsapOK = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const body = document.body;
  const siteNav = document.querySelector('.site-nav');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  let lenis;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .92 });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  const cursor = document.querySelector('.cursor');
  if (cursor && matchMedia('(pointer:fine)').matches) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    const tick = () => {
      cx += (tx - cx) * .16;
      cy += (ty - cy) * .16;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    document.querySelectorAll('a,button,.map-marker,.experience-row,.polaroid-card,.video-card,.work-row').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursor.querySelector('span').textContent = el.classList.contains('video-card') ? 'PLAY' : 'VIEW';
      });
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('rui-theme');
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const applyTheme = (theme) => {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(theme);
    if (themeToggle) themeToggle.textContent = theme === 'theme-dark' ? 'DARK' : 'LIGHT';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme === 'theme-dark' ? '#101010' : '#ffffff');
    localStorage.setItem('rui-theme', theme);
  };
  applyTheme(savedTheme || (preferDark ? 'theme-dark' : 'theme-light'));
  themeToggle?.addEventListener('click', () => {
    applyTheme(body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark');
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  let menuOpen = false;
  function setMenu(open) {
    menuOpen = open;
    menuToggle?.setAttribute('aria-expanded', String(open));
    if (menuToggle) menuToggle.textContent = open ? 'CLOSE ×' : 'MENU +';
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    if (gsapOK) gsap.to(mobileMenu, { y: open ? '0%' : '-100%', duration: .6, ease: 'power4.inOut' });
    else if (mobileMenu) mobileMenu.style.transform = `translateY(${open ? 0 : -100}%)`;
  }
  menuToggle?.addEventListener('click', () => setMenu(!menuOpen));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  const journeyData = {
    shanghai: {
      meta: 'SHANGHAI, CHINA · 2001–2013',
      title: 'Where discipline started.',
      text: 'I was born in Shanghai in 2001. My childhood there gave me structure early: discipline, curiosity, and the first sense that practice matters — especially through dance.',
      main: 'assets/images/shanghai-child.webp',
      small: 'assets/images/dance-baby.webp',
      mainAlt: 'Rui as a child in Shanghai',
      smallAlt: 'Rui dancing as a child',
      label: 'SHANGHAI · 2001',
      tags: ['FIRST HOME', 'EARLY DISCIPLINE', 'DANCE BEGINS'],
      links: []
    },
    virginia: {
      meta: 'VIRGINIA, USA · 2013–2020',
      title: 'Where I learned to adapt.',
      text: 'Moving to Virginia at thirteen taught me how to adapt quickly, bridge cultures, and become more confident in unfamiliar rooms. It was also where language, public speaking, and community began shaping how I show up.',
      main: 'assets/images/va-hmc.webp',
      small: 'assets/images/va-spanish.webp',
      mainAlt: 'Rui with classmates at Miller School of Albemarle',
      smallAlt: 'Rui with classmates at Miller School',
      label: 'VIRGINIA · 2013',
      tags: ['MILLER SCHOOL', 'ADAPTABILITY', 'COMMUNITY'],
      links: [
        { label: 'HARVARD MODEL CONGRESS ↗', url: 'https://millerschoolofalbemarle.org/news-from-the-hill/2018/3/31/harvard-model-congress' },
        { label: 'SPANISH HONOR SOCIETY ↗', url: 'https://millerschoolofalbemarle.org/news-from-the-hill/2018/5/9/enhorabuena' }
      ]
    },
    newyork: {
      meta: 'NEW YORK CITY · 2020–NOW',
      title: 'Where everything converged.',
      text: 'New York gave me range. At Barnard and Columbia, my interests in markets, analytics, and business started converging into a clearer point of view: use analysis rigorously, but always in service of better judgment.',
      main: 'assets/images/nyc-grad.webp',
      small: 'assets/images/nyc-campus.webp',
      mainAlt: 'Rui at graduation in New York',
      smallAlt: 'Rui with friends in New York',
      label: 'NEW YORK · 2020',
      tags: ['BARNARD', 'COLUMBIA', 'DIRECTION'],
      links: []
    },
    seoul: {
      meta: 'SEOUL, SOUTH KOREA · 2022',
      title: 'Where my lens widened.',
      text: 'Studying at Yonsei in 2022 expanded how I think about culture, ambition, and communication. Seoul reminded me that perspective changes when you move across systems — and that is often where growth begins.',
      main: 'assets/images/seoul-campus.webp',
      small: 'assets/images/dance-tv.webp',
      mainAlt: 'Yonsei University campus in Seoul',
      smallAlt: 'Rui on JTBC dance program DNAcers',
      label: 'SEOUL · 2022',
      tags: ['YONSEI', 'GLOBAL PERSPECTIVE', 'JTBC'],
      links: []
    }
  };

  const mainImg = document.getElementById('journeyMainImage');
  const smallImg = document.getElementById('journeySmallImage');
  const meta = document.getElementById('journeyMeta');
  const title = document.getElementById('journeyTitle');
  const text = document.getElementById('journeyText');
  const tags = document.getElementById('journeyTags');
  const label = document.getElementById('journeyPhotoLabel');
  const links = document.getElementById('journeyLinks');

  function activatePlace(place) {
    const d = journeyData[place];
    if (!d) return;
    document.querySelectorAll('.map-marker').forEach(m => m.classList.toggle('active', m.dataset.place === place));
    const swap = () => {
      mainImg.src = d.main;
      mainImg.alt = d.mainAlt;
      smallImg.src = d.small;
      smallImg.alt = d.smallAlt;
      meta.textContent = d.meta;
      title.textContent = d.title;
      text.textContent = d.text;
      label.textContent = d.label;
      tags.innerHTML = d.tags.map(t => `<span>${t}</span>`).join('');
      links.innerHTML = d.links.map(link => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join('');
    };

    if (gsapOK && !reduced) {
      gsap.to('.journey-story', {
        opacity: 0,
        y: 10,
        duration: .18,
        onComplete: () => {
          swap();
          gsap.to('.journey-story', { opacity: 1, y: 0, duration: .42, ease: 'power3.out' });
        }
      });
    } else swap();
  }
  document.querySelectorAll('.map-marker').forEach(m => ['mouseenter', 'focus', 'click'].forEach(evt => m.addEventListener(evt, () => activatePlace(m.dataset.place))));

  const workPreviewTitle = document.getElementById('workPreviewTitle');
  const workPreviewSummary = document.getElementById('workPreviewSummary');
  document.querySelectorAll('.work-row').forEach((row) => {
    const setPreview = () => {
      if (workPreviewTitle) workPreviewTitle.textContent = row.dataset.preview || 'WORK';
      if (workPreviewSummary) workPreviewSummary.textContent = row.dataset.summary || '';
    };
    row.addEventListener('mouseenter', setPreview);
    row.addEventListener('focus', setPreview);
  });

  document.querySelectorAll('.experience-row').forEach(row => {
    const detail = row.querySelector('.experience-detail');
    const open = () => {
      document.querySelectorAll('.experience-detail').forEach(d => {
        if (d !== detail) {
          if (gsapOK) gsap.to(d, { height: 0, duration: .28 });
          else d.style.height = '0px';
        }
      });
      if (gsapOK) gsap.to(detail, { height: 'auto', duration: .42, ease: 'power3.inOut' });
      else detail.style.height = 'auto';
    };
    row.addEventListener('mouseenter', open);
    row.addEventListener('focus', open);
    row.addEventListener('click', open);
  });

  const modal = document.querySelector('.video-modal');
  const iframe = modal?.querySelector('iframe');
  const closeBtn = modal?.querySelector('.video-close');
  function closeVideo() {
    if (!modal) return;
    if (gsapOK) {
      gsap.to(modal, { opacity: 0, duration: .25, onComplete: () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        if (iframe) iframe.src = '';
      }});
    } else {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      if (iframe) iframe.src = '';
    }
  }
  document.querySelectorAll('.video-card').forEach(btn => {
    const openVideo = () => {
      if (!iframe) return;
      iframe.src = `https://www.youtube.com/embed/${btn.dataset.video}?autoplay=1&rel=0`;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      if (gsapOK) gsap.to(modal, { opacity: 1, duration: .28 });
      else modal.style.opacity = 1;
    };
    btn.addEventListener('click', openVideo);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideo();
      }
    });
  });
  closeBtn?.addEventListener('click', closeVideo);
  modal?.addEventListener('click', e => { if (e.target === modal) closeVideo(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeVideo(); });

  if (!gsapOK || reduced) {
    body.classList.remove('is-loading');
    siteNav?.classList.add('ready');
    document.querySelector('.opening')?.remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  if (lenis) lenis.on('scroll', ScrollTrigger.update);

  const intro = gsap.timeline({ defaults: { ease: 'power4.inOut' }, onComplete: () => body.classList.remove('is-loading') });
  intro
    .from('.opening-name', { yPercent: 105, opacity: 0, duration: .7 })
    .from('.opening-meta', { opacity: 0, y: 10, duration: .35 }, '<.2')
    .to('.opening', { yPercent: -100, duration: .9, delay: .18 })
    .set('.site-nav', { opacity: 1, pointerEvents: 'auto' }, '<.2')
    .add(() => siteNav.classList.add('ready'), '<')
    .from('.hero-word-left', { x: 60, opacity: 0, duration: .8 }, '<-.05')
    .from('.hero-word-right', { x: -60, opacity: 0, duration: .8 }, '<')
    .from('.hero-photo-frame', { y: 40, opacity: 0, duration: .75 }, '<.05')
    .from('.hero-copy, .hero-keywords, .scroll-cue', { y: 20, opacity: 0, stagger: .08, duration: .45 }, '<.1');

  gsap.utils.toArray('.section-head').forEach(el => {
    gsap.from(el, { y: 24, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  gsap.utils.toArray('.polaroid-card, .journey-story, .journey-map-wrap, .experience-row, .education-grid article, .project-panel, .dance-hero, .dance-frame').forEach((el, i) => {
    gsap.from(el, { y: 24, opacity: 0, duration: .6, delay: Math.min(i * .03, .12), ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  gsap.utils.toArray('.work-row').forEach((el, i) => {
    gsap.from(el, { y: 18, opacity: 0, duration: .45, delay: Math.min(i * .03, .12), ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 94%' } });
  });

  gsap.from('.journey-route, .journey-route-secondary', {
    strokeDashoffset: 180,
    opacity: 0,
    duration: 1.3,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.journey-map-wrap', start: 'top 82%' }
  });

  gsap.to('.hero-photo', {
    yPercent: 4,
    scale: 1.03,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  const danceScroll = document.querySelector('.dance-scroll');
  const danceTrack = document.querySelector('.dance-track');
  if (danceScroll && danceTrack && window.innerWidth > 980) {
    const getDistance = () => Math.max(0, danceTrack.scrollWidth - window.innerWidth + window.innerWidth * .08);
    const danceTween = gsap.to(danceTrack, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: danceScroll,
        start: 'top 104px',
        end: () => `+=${getDistance() + window.innerHeight * .55}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    window.addEventListener('resize', () => { danceTween.scrollTrigger?.refresh(); });
  }

  gsap.utils.toArray('.project-panel').forEach((panel, i, panels) => {
    if (i === panels.length - 1) return;
    ScrollTrigger.create({
      trigger: panels[i + 1],
      start: 'top 85%',
      end: 'top 18%',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(panel, { scale: 1 - self.progress * .018, filter: `brightness(${1 - self.progress * .05})` });
      }
    });
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * .12,
        y: (e.clientY - r.top - r.height / 2) * .12,
        duration: .3
      });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .45, ease: 'elastic.out(1,.45)' }));
  });
})();
