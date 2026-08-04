import React, { useState, useEffect, useRef } from 'react';
import bgVideo from './assets/night-cycle-to-eterna-pokemon-diamond-and-pearl-pixel-moewalls-com.mp4';
import ksuSvg from './assets/Kennesaw_State_Owls_logo.svg?raw';
import tcsSvg from './assets/tcs-cropped.svg?raw';
import trainerSprite from './assets/trainer.png';

const profileData = {
  name: "Abdi Farah",
  money: "₽3000",
  pokedex: "493/493",
  time: "38:04",
  started: "Aug. 30, 2002",
  idNo: "14463"
};

const badgeLogoData = [
  {
    id: 'ksu',
    name: 'Kennesaw State University',
    alt: 'Kennesaw State Owls logo',
    toneClass: 'badge-ksu',
    svg: ksuSvg,
    role: 'B.S. Computer Engineering',
    period: '2020 — 2025',
    detail: 'Bachelor of Science in Computer Engineering. Coursework across embedded systems, full-stack development, and software design.'
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    alt: 'TCS infinity mark logo',
    toneClass: 'badge-tcs',
    svg: tcsSvg,
    role: 'Software Engineer',
    period: 'May 2026 — Present · Cincinnati, OH',
    detail: 'Full-stack development with Node.js, code reviews, unit testing, and feature delivery in an Agile/Scrum team.'
  }
];

const projectsData = [
  {
    title: "CareConnect",
    subtitle: "AI Baby Monitor",
    desc: "An AI-powered baby monitoring system designed to detect and alert parents to specific audio and visual cues.",
    tags: ["Python", "C", "TensorFlow", "MQTT", "AWS"]
  },
  {
    title: "Traffic Camera Dashboard",
    subtitle: "City of Peachtree Corners, GA",
    desc: "A centralized dashboard for monitoring municipal traffic cameras and analyzing flow data.",
    tags: ["React.js", "Node.js", "InfluxDB", "Node-RED"]
  },
  {
    title: "Dynamic Learning Path",
    subtitle: "AI-Powered Generator",
    desc: "Generates personalized, adaptive learning paths for users based on their goals using AI models.",
    tags: ["React.js", "FastAPI", "Next.js", "Redis"]
  }
];

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' }
];

const marqueeSkills = [
  { name: 'JavaScript', icon: 'solar:code-square-linear' },
  { name: 'TypeScript', icon: 'solar:code-2-linear' },
  { name: 'React', icon: 'solar:atom-linear' },
  { name: 'Node.js', icon: 'solar:server-linear' },
  { name: 'Python', icon: 'solar:programming-linear' },
  { name: 'PostgreSQL', icon: 'solar:database-linear' },
  { name: 'Tailwind CSS', icon: 'solar:wind-linear' },
  { name: 'Vite', icon: 'solar:bolt-linear' },
  { name: 'AWS', icon: 'solar:cloud-linear' },
  { name: 'Git / CI-CD', icon: 'solar:branching-paths-up-linear' },
  { name: 'Java', icon: 'solar:cup-hot-linear' },
  { name: 'Agile / Scrum', icon: 'solar:refresh-circle-linear' }
];

// Renders the trainer sprite if available, otherwise a GBA-style empty slot
function SpriteSlot() {
  if (trainerSprite) {
    return (
      <img
        src={trainerSprite}
        alt="Pixel art trainer sprite of Abdi Farah"
        className="w-full h-full object-contain pixelated select-none"
        draggable="false"
      />
    );
  }
  return (
    <div className="text-center p-2 opacity-50 select-none flex flex-col items-center gap-2">
      <iconify-icon icon="solar:user-rounded-linear" width="48" className="text-slate-600"></iconify-icon>
      <span className="text-xs font-pixel leading-relaxed text-slate-600">
        SPRITE<br/>SLOT
      </span>
    </div>
  );
}

const aboutText = `I'm a recent graduate in Computer Engineering from Kennesaw State University, and I've spent the past few years 
diving deep into projects that combine my interests in embedded systems, AI, and full stack development. What gets me 
excited: Hardware projects, especially ones involving sensors, microcontrollers, and real-world data. 
I love the challenge of making different systems talk to each other, whether that's getting AWS to play nice with 
a Raspberry Pi or building MQTT pipelines that actually scale. I'm also fascinated by computer vision and how we can 
train models to understand visual data in meaningful ways.`;

const skillsData = [
  {
    category: 'Languages',
    skills: [
      { name: 'JavaScript / TypeScript', level: 88 },
      { name: 'Python', level: 80 },
      { name: 'SQL', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'C / C++', level: 62 }
    ]
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 85 },
      { name: 'HTML / CSS', level: 90 },
      { name: 'Tailwind CSS', level: 82 },
      { name: 'Vite', level: 78 }
    ]
  },
  {
    category: 'Backend & Tools',
    skills: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'PostgreSQL', level: 74 },
      { name: 'Git / GitHub Actions', level: 84 },
      { name: 'AWS', level: 64 },
      { name: 'Agile / Scrum', level: 80 }
    ]
  }
];

const rolesData = [
  {
    title: 'Full-Stack Engineer',
    desc: 'End-to-end feature work — from database schema to polished UI.'
  },
  {
    title: 'Frontend Engineer',
    desc: 'React, performance, and interfaces people actually enjoy using.'
  },
  {
    title: 'Backend Engineer',
    desc: 'APIs, services, and data layers built to be tested and scaled.'
  },
  {
    title: 'Forward Deployed Engineer',
    desc: 'Embedding with customers to turn real problems into shipped solutions.'
  }
];

const contactLinks = [
  { label: 'GITHUB', href: 'https://www.github.com/Abdirazakf', icon: 'solar:code-circle-linear', external: true },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/abdirazak-farah', icon: 'solar:user-id-linear', external: true },
  { label: 'EMAIL', href: 'mailto:farahabdirazak13@gmail.com', icon: 'solar:letter-linear', external: false }, // TODO: swap in your real email
  { label: 'RESUME', href: `${import.meta.env.BASE_URL}resume.pdf`, icon: 'solar:document-text-linear', external: true }
];

export default function App() {
  const [loaderState, setLoaderState] = useState('active');
  const [count, setCount] = useState('000');
  const [projectIndex, setProjectIndex] = useState(0);
  const [selectedBadge, setSelectedBadge] = useState(null);
  
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);

  // Loader Animation Effect
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const duration = 2000;
    let startTime = null;
    let animationFrame;

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutQuad
      const easeInOutQuad = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const currentCount = Math.round(easeInOutQuad * 100);

      setCount(String(currentCount).padStart(3, '0'));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => setLoaderState('hiding'), 150);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    // Fallback if animation freezes
    const fallbackTimeout = setTimeout(() => {
      if (loaderState === 'active') setLoaderState('hiding');
    }, 6000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  useEffect(() => {
    if (loaderState === 'hiding') {
      const hideTimer = setTimeout(() => {
        setLoaderState('hidden');
        if (!selectedBadge) document.body.style.overflow = '';
      }, 900);
      return () => clearTimeout(hideTimer);
    }
  }, [loaderState, selectedBadge]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Clear stagger delays after the entrance finishes so hover
            // transitions on the same element respond instantly
            setTimeout(() => {
              entry.target.classList.remove('reveal-d-1', 'reveal-d-2', 'reveal-d-3', 'reveal-d-4');
            }, 900);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // 3D Tilt Handlers (tracked on the section so the wrapper never sits in the click path)
  const handleMouseMove = (e) => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Only tilt while the pointer is actually over the card area
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      return;
    }

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  // Badge Modal Handlers
  const justOpenedRef = useRef(false);

  const openModal = (e, badge) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setSelectedBadge(badge);
    document.body.style.overflow = 'hidden';
    // Ignore any close events fired by this same pointer interaction
    justOpenedRef.current = true;
    setTimeout(() => { justOpenedRef.current = false; }, 350);
  };

  const doClose = () => {
    if (justOpenedRef.current) return;
    setSelectedBadge(null);
    document.body.style.overflow = '';
  };

  const backdropClose = (e) => {
    // Only the backdrop element itself should close (ignore bubbled clicks)
    if (e.currentTarget !== e.target) return;
    doClose();
  };

  // Project Carousel Handlers
  const projectCount = projectsData.length;
  const nextProject = () => setProjectIndex((i) => (i + 1) % projectCount);
  const prevProject = () => setProjectIndex((i) => (i - 1 + projectCount) % projectCount);

  // Computes each card's 3D placement from its position relative to the
  // featured card, taking the shortest path around the ring
  const getProjectCardStyle = (index) => {
    let rel = (index - projectIndex + projectCount) % projectCount;
    if (rel > projectCount / 2) rel -= projectCount;
    const abs = Math.abs(rel);
    return {
      transform: `translateX(calc(${rel} * var(--carousel-offset, 190px))) scale(${1 - abs * 0.1}) rotateY(${rel * -12}deg)`,
      opacity: abs === 0 ? 1 : 0.55,
      filter: abs === 0 ? 'none' : 'brightness(0.85)',
      zIndex: 10 - abs * 4
    };
  };

  // Esc key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedBadge) doClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedBadge]);

  return (
    <>
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none" 
        src={bgVideo} 
      />

      {/* Sync Loader */}
      {loaderState !== 'hidden' && (
        <div 
          className={`fixed inset-0 z-[99] bg-slate-900 text-slate-100 flex flex-col justify-end transition-transform duration-[900ms] ease-in-out ${loaderState === 'hiding' ? '-translate-y-full' : 'translate-y-0'}`}
        >
          <div className="px-6 md:px-12 pb-10 md:pb-14 flex items-end justify-between border-t border-slate-100/15 pt-6 mx-6 md:mx-12">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-100/50 font-pixel">
              TRAINER DATA — SYNC
            </p>
            <p className="text-4xl md:text-6xl font-pixel tracking-tight tabular-nums leading-none">
              {count}
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {/* NAVBAR — fixed glass pill */}
        <nav className="fixed top-0 w-full z-40 px-4 py-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="glass-light rounded-full px-5 py-2.5 flex items-center justify-between mx-auto max-w-2xl">
              <a href="#top" className="font-pixel text-[10px] text-slate-800 hover:text-sky-600 transition-colors tracking-tight flex items-center gap-2 group">
                <span className="pokeball-dot group-hover:rotate-180 transition-transform duration-500" aria-hidden="true"></span>
                ABDI FARAH
              </a>
              <div className="hidden md:flex items-center gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-pixel text-[9px] text-slate-600 hover:text-sky-700 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel text-[9px] px-4 py-2 rounded-full bg-sky-500/90 text-white hover:bg-sky-600 hover:scale-105 transition-all shadow-sm"
              >
                RESUME
              </a>
            </div>
          </div>
        </nav>

        {/* SECTION 1: HERO / TRAINER CARD */}
        <section 
          id="top"
          className="min-h-screen flex w-full mb-2 px-4 relative items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="tilt-wrapper w-full max-w-4xl mx-auto" 
            ref={wrapperRef}
          >
            <div className="tilt-card gba-window relative p-1 pb-6 w-full flex flex-col gap-4" ref={cardRef}>              
              {/* Header */}
              <div className="p-6 pb-2 flex justify-center gap-4 items-center relative z-20">
                <h1 className="font-pixel text-xl md:text-3xl pt-2 title-gba uppercase">
                  TRAINER CARD
                </h1>
              </div>

              {/* Main Content Grid */}
              <div className="px-8 mt-4 grid grid-cols-1 md:grid-cols-5 gap-8 relative z-20">
                <div className="md:col-span-3 flex flex-col justify-between gap-6 py-2">
                  <div className="flex justify-between items-end">
                    <span className="font-pixel text-sm md:text-lg text-gba">Name</span>
                    <span className="font-pixel text-sm md:text-lg text-gba">{profileData.name}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-pixel text-sm md:text-lg text-gba">Money</span>
                    <span className="font-pixel text-sm md:text-lg text-gba">{profileData.money}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-pixel text-sm md:text-lg text-gba">Pokédex</span>
                    <span className="font-pixel text-sm md:text-lg text-gba">{profileData.pokedex}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-pixel text-sm md:text-lg text-gba">Time</span>
                    <span className="font-pixel text-sm md:text-lg text-gba">{profileData.time}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-pixel text-sm md:text-lg text-gba">Started</span>
                    <span className="font-pixel text-sm md:text-lg text-gba">{profileData.started}</span>
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col items-center justify-start gap-4">
                  <div className="flex justify-between w-full items-end pl-2">
                    <span className="font-pixel text-sm md:text-lg text-gba">ID No.</span>
                    <span className="font-pixel text-sm md:text-lg text-gba">{profileData.idNo}</span>
                  </div>
                  <div className="gba-inner-window w-full aspect-[4/5] flex items-center justify-center relative overflow-hidden">
                    <SpriteSlot />
                  </div>
                </div>
              </div>

              {/* Badge Row */}
              <div className="px-8 mt-8 mb-4 relative z-20">
                <div className="w-full h-1 bg-white/30 rounded-full mb-6"></div>
                <div className="badge-row flex items-center gap-4 flex-wrap px-4 justify-start">
                  {badgeLogoData.map((badge) => (
                    <button 
                      key={badge.id}
                      type="button" 
                      onClick={(e) => openModal(e, badge)}
                      style={{ position: 'relative', zIndex: 40 }}
                      className={`badge-medallion ${badge.toneClass} w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 cursor-pointer`} 
                      aria-label={`Open ${badge.name} badge`}
                    >
                      <span 
                        className="badge-logo" 
                        role="img" 
                        aria-label={badge.alt}
                        dangerouslySetInnerHTML={{ __html: badge.svg }}
                      />
                      <span className="badge-sweep" aria-hidden="true"></span>
                    </button>
                  ))}
                </div>
                <div className="w-full h-1 bg-white/30 rounded-full mt-6"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS MARQUEE STRIP */}
        <div className="w-full border-y-4 border-white/60 glass-light overflow-hidden py-4 relative z-10 mb-2">
          <div className="marquee-container relative max-w-7xl mx-auto w-full">
            <div className="marquee-content flex gap-10 w-max items-center">
              {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
                <div
                  key={`${skill.name}-${i}`}
                  className="flex items-center gap-2 text-slate-700 select-none shrink-0"
                  aria-hidden={i >= marqueeSkills.length ? 'true' : undefined}
                >
                  <iconify-icon icon={skill.icon} width="18" className="text-sky-700"></iconify-icon>
                  <span className="font-pixel text-[9px] tracking-tight whitespace-nowrap pt-0.5">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="w-full max-w-5xl mx-auto px-4 py-12 scroll-mt-8 reveal">
          <h2 className="font-pixel tracking-tight text-xl text-center mb-10 text-slate-800">
            ABOUT
          </h2>
          <div className="gba-window p-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 items-center">
              <div className="gba-inner-window aspect-[4/5] max-w-[220px] w-full mx-auto flex items-center justify-center overflow-hidden">
                <SpriteSlot />
              </div>
              <div className="md:col-span-2">
                <p className="text-sm md:text-base leading-relaxed text-slate-700 bg-white/85 backdrop-blur rounded-xl p-5 shadow-inner">
                  {aboutText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SKILLS */}
        <section id="skills" className="w-full max-w-5xl mx-auto px-4 py-12 scroll-mt-8 reveal">
          <h2 className="font-pixel tracking-tight text-xl text-center mb-10 text-slate-800">
            SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {skillsData.map((group, groupIdx) => (
              <div
                key={group.category}
                className={`gba-inner-window bg-white/90 backdrop-blur p-5 shadow-lg card-lift reveal reveal-d-${groupIdx + 1}`}
              >
                <h3 className="font-pixel text-[11px] text-slate-800 mb-5 tracking-tight text-center">
                  {group.category.toUpperCase()}
                </h3>
                <div className="flex flex-col gap-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[11px] font-medium text-slate-700">{skill.name}</span>
                        <span className="font-pixel text-[9px] text-slate-500">{skill.level}</span>
                      </div>
                      <div
                        className="stat-track"
                        role="progressbar"
                        aria-label={`${skill.name} proficiency`}
                        aria-valuenow={skill.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="stat-fill" style={{ '--fill': `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS */}
        <section id="projects" className="w-full max-w-5xl mx-auto px-4 py-12 scroll-mt-8 reveal">
          <h2 className="font-pixel tracking-tight text-xl text-center text-slate-800">
            PROJECTS
          </h2>
          <div className="project-carousel relative flex items-center justify-center pt-6 pb-4" style={{ perspective: '1200px' }}>
            {/* Prev */}
            <button
              type="button"
              onClick={prevProject}
              aria-label="Previous project"
              className="absolute left-0 sm:left-4 z-20 w-11 h-11 rounded-full glass-light flex items-center justify-center text-slate-700 hover:text-sky-700 hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <iconify-icon icon="solar:alt-arrow-left-linear" width="22"></iconify-icon>
            </button>

            {/* Track */}
            <div className="relative w-full max-w-md h-[430px] sm:h-[460px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {projectsData.map((project, index) => {
                  const isFeatured = index === projectIndex;
                  return (
                    <div
                      key={project.title}
                      onClick={() => !isFeatured && setProjectIndex(index)}
                      style={getProjectCardStyle(index)}
                      className={`absolute w-[280px] sm:w-80 transition-all duration-500 ease-out ${
                        isFeatured ? '' : 'cursor-pointer'
                      }`}
                      aria-hidden={isFeatured ? undefined : 'true'}
                    >
                      <div className={`gba-inner-window p-5 sm:p-6 flex flex-col bg-white/95 backdrop-blur rounded-xl border transition-all duration-500 min-h-[340px] ${
                        isFeatured ? 'border-sky-400 shadow-2xl' : 'border-slate-300 shadow-lg'
                      }`}>
                        <h3 className={`font-pixel text-sm mb-1 tracking-tight transition-colors ${
                          isFeatured ? 'text-sky-700' : 'text-slate-800'
                        }`}>
                          {project.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-3">
                          {project.subtitle}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {project.desc}
                        </p>
                        <div className={`flex flex-wrap gap-2 transition-all duration-500 ${
                          isFeatured ? 'opacity-100 mt-4' : 'opacity-0 mt-4'
                        }`}>
                          {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={nextProject}
              aria-label="Next project"
              className="absolute right-0 sm:right-4 z-20 w-11 h-11 rounded-full glass-light flex items-center justify-center text-slate-700 hover:text-sky-700 hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <iconify-icon icon="solar:alt-arrow-right-linear" width="22"></iconify-icon>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-2">
            {projectsData.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => setProjectIndex(index)}
                aria-label={`Go to ${project.title}`}
                className={`w-3 h-3 rounded-full border-2 border-slate-500 transition-all ${
                  index === projectIndex ? 'bg-sky-500 scale-110' : 'bg-white/70 hover:bg-sky-200'
                }`}
              />
            ))}
          </div>
        </section>

        {/* SECTION 5: OPEN TO / CONTACT */}
        <section id="contact" className="w-full max-w-5xl mx-auto px-4 py-12 scroll-mt-8 reveal">
          <h2 className="font-pixel tracking-tight text-xl text-center mb-8 text-slate-800">
            OPEN TO
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {rolesData.map((role, roleIdx) => (
              <div
                key={role.title}
                className={`gba-inner-window bg-white/90 backdrop-blur p-5 shadow-lg flex flex-col gap-2 card-lift reveal reveal-d-${roleIdx + 1}`}
              >
                <h3 className="font-pixel text-[10px] text-slate-800 leading-relaxed tracking-tight">
                  {role.title.toUpperCase()}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="gba-inner-window bg-white/90 px-4 py-2 flex items-center gap-2 hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <iconify-icon icon={link.icon} width="20" className="text-slate-600 group-hover:text-sky-600"></iconify-icon>
                <span className="font-pixel text-xs pt-1">{link.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full mt-auto px-4 pb-4">
          <div className="gba-window max-w-5xl mx-auto p-1">
            <div className="px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-pixel text-[9px] text-gba leading-relaxed text-center sm:text-left">
                © {new Date().getFullYear()} ABDI FARAH
                <span className="hidden sm:inline"> · </span>
                <br className="sm:hidden" />
                THANKS FOR PLAYING!
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="footer-top-btn group font-pixel text-[9px] text-slate-700 hover:text-sky-700 flex items-center gap-2 gba-inner-window bg-white/90 px-4 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Back to top"
              >
                BACK TO TOP
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* MODAL FOR BADGES */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          selectedBadge ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" onClick={backdropClose}></div>
        
        {selectedBadge && (
          <div className="relative z-10 flex flex-col items-center gap-6 pointer-events-none">
            <div 
              className={`badge-medallion ${selectedBadge.toneClass} w-48 h-48 rounded-full shadow-2xl flex items-center justify-center spin-3d relative overflow-hidden`}
              aria-label={`${selectedBadge.name} badge`}
            >
              <span 
                className="badge-logo badge-logo-lg" 
                role="img" 
                aria-label={selectedBadge.alt}
                dangerouslySetInnerHTML={{ __html: selectedBadge.svg }}
              />
              <span className="badge-sweep" aria-hidden="true"></span>
            </div>
            <div className="max-w-sm text-center px-6 py-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl">
              <h3 className="font-pixel text-white text-sm md:text-base tracking-tight drop-shadow-md leading-relaxed">
                {selectedBadge.name}
              </h3>
              <p className="font-pixel text-sky-300 text-[10px] mt-2 tracking-tight">
                {selectedBadge.role}
              </p>
              <p className="text-slate-300 text-[11px] mt-1">
                {selectedBadge.period}
              </p>
              <p className="text-slate-200 text-xs mt-3 leading-relaxed font-sans">
                {selectedBadge.detail}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}