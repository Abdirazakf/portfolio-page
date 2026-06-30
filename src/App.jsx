import React, { useState, useEffect, useRef } from 'react';

// Data Constants
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
    toneClass: 'badge-ksu'
  },
  {
    id: 'tcs',
    name: 'TCS',
    alt: 'TCS infinity mark logo',
    toneClass: 'badge-tcs'
  }
];

const projectsData = [
  {
    title: "CareConnect",
    subtitle: "AI Baby Monitor (Capstone)",
    desc: "An AI-powered baby monitoring system designed to detect and alert parents to specific audio and visual cues.",
    tags: ["Python", "AI", "Computer Vision"]
  },
  {
    title: "Traffic Camera Dashboard",
    subtitle: "City of Peachtree Corners, GA",
    desc: "A centralized dashboard for monitoring municipal traffic cameras and analyzing flow data.",
    tags: ["React", "Node.js", "Dashboard"]
  },
  {
    title: "Dynamic Learning Path",
    subtitle: "AI-Powered Generator",
    desc: "Generates personalized, adaptive learning paths for users based on their goals using AI models.",
    tags: ["OpenAI API", "Next.js"]
  }
];

const rotations = ['-rotate-3 translate-y-4', 'rotate-2 -translate-y-2', 'rotate-3 translate-y-6'];

export default function App() {
  const [loaderState, setLoaderState] = useState('active'); // active, hiding, hidden
  const [count, setCount] = useState('000');
  const [activeProject, setActiveProject] = useState(null);
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

  // 3D Tilt Handlers
  const handleMouseMove = (e) => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (!wrapperRef.current || !cardRef.current) return;
    
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
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
  const openModal = (badge) => {
    setSelectedBadge(badge);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedBadge(null);
    document.body.style.overflow = '';
  };

  // Project Click Handler
  const toggleProject = (e, index) => {
    e.stopPropagation();
    setActiveProject(activeProject === index ? null : index);
  };

  const resetProjects = () => setActiveProject(null);

  // Esc key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedBadge) closeModal();
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
        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c6f09f05-9b62-4141-b454-bb9d51821314_video.mp4" 
        poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/025bc8d0-497f-4476-934f-d9dcfe6b7458_1600w.jpg"
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

      <div onClick={resetProjects} className="relative z-10 w-full flex flex-col min-h-screen">
        {/* SECTION 1: HERO / TRAINER CARD */}
        <section className="min-h-screen flex w-full mb-2 px-4 relative items-center justify-center">
          <div 
            className="tilt-wrapper w-full max-w-4xl mx-auto" 
            ref={wrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="tilt-card gba-window relative p-1 pb-6 w-full flex flex-col gap-4" ref={cardRef}>
              <iconify-icon icon="mdi:pokeball" className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[450px] text-white opacity-20 pointer-events-none z-0"></iconify-icon>
              
              {/* Header */}
              <div className="p-6 pb-2 flex justify-center gap-4 items-center relative z-20">
                <iconify-icon icon="mdi:pokeball" className="text-white text-3xl drop-shadow-md"></iconify-icon>
                <h1 className="font-pixel text-xl md:text-3xl pt-2 title-gba uppercase">
                  TRAINER CARD
                </h1>
                <iconify-icon icon="mdi:pokeball" className="text-white text-3xl drop-shadow-md"></iconify-icon>
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
                    <div className="text-center p-2 opacity-50 select-none flex flex-col items-center gap-2">
                      <iconify-icon icon="solar:user-rounded-linear" width="48" className="text-slate-600"></iconify-icon>
                      <span className="text-xs font-pixel leading-relaxed text-slate-600">
                        SPRITE<br/>SLOT
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge Row */}
              <div className="px-8 mt-8 mb-4 relative z-20">
                <div className="w-full h-1 bg-white/30 rounded-full mb-6"></div>
                <div className="flex items-center gap-4 flex-wrap px-4 justify-start">
                  {badgeLogoData.map((badge) => (
                    <button 
                      key={badge.id}
                      type="button" 
                      onClick={() => openModal(badge)}
                      className={`badge-medallion ${badge.toneClass} w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 cursor-pointer`} 
                      aria-label={`Open ${badge.name} badge`}
                    >
                      <img 
                        src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" 
                        alt={badge.alt} 
                        className="badge-logo w-3/4 h-3/4 object-contain select-none" 
                        draggable="false"
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

        {/* SECTION 2: PROJECTS */}
        <section className="w-full max-w-5xl mx-auto px-4 py-12 reveal">
          <h2 className="font-pixel tracking-tight text-xl text-center mb-10 text-slate-800">
            DATA / LOG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-end min-h-[450px] w-full max-w-5xl mx-auto pt-10 pb-8">
            {projectsData.map((project, index) => {
              const isActive = activeProject === index;
              const isBlurred = activeProject !== null && activeProject !== index;
              const rotClass = rotations[index % rotations.length];

              return (
                <div 
                  key={index}
                  onClick={(e) => toggleProject(e, index)}
                  className={`project-card self-end w-full max-w-[320px] transition-all duration-700 ease-out cursor-pointer group ${
                    isActive 
                      ? 'translate-y-[-16px] rotate-0 scale-105 z-50 opacity-100 blur-none' 
                      : isBlurred 
                        ? `${rotClass} blur-sm opacity-50 z-10` 
                        : `${rotClass} hover:scale-105 z-10 opacity-100 blur-none`
                  }`}
                  style={{ filter: isBlurred ? 'blur(6px)' : '' }}
                >
                  <div className="gba-inner-window p-5 sm:p-6 flex flex-col h-full bg-white/95 backdrop-blur shadow-lg border border-slate-300 hover:shadow-xl transition-shadow duration-500 rounded-xl relative overflow-hidden">
                    <h3 className="font-pixel text-sm text-slate-800 mb-1 tracking-tight group-hover:text-sky-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 flex-grow leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>
                    <div 
                      className={`project-skills flex flex-wrap gap-2 transition-all duration-500 overflow-hidden ${
                        isActive ? 'opacity-100 max-h-[200px] translate-y-0 mt-4' : 'opacity-0 max-h-0 translate-y-2 mt-0'
                      }`}
                    >
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
        </section>

        {/* SECTION 3: FOOTER */}
        <footer className="w-full mt-auto py-12 reveal flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="gba-inner-window px-4 py-2 flex items-center gap-2 hover:bg-slate-100 transition-colors cursor-pointer group">
              <iconify-icon icon="solar:code-circle-linear" width="20" className="text-slate-600 group-hover:text-black"></iconify-icon>
              <span className="font-pixel text-xs pt-1">GITHUB</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="gba-inner-window px-4 py-2 flex items-center gap-2 hover:bg-slate-100 transition-colors cursor-pointer group">
              <iconify-icon icon="solar:user-id-linear" width="20" className="text-slate-600 group-hover:text-[#0077b5]"></iconify-icon>
              <span className="font-pixel text-xs pt-1">LINKEDIN</span>
            </a>
          </div>
          <p className="text-xs text-slate-400">SELECT to Start</p>
        </footer>
      </div>

      {/* MODAL FOR BADGES */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          selectedBadge ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" onClick={closeModal}></div>
        
        {selectedBadge && (
          <div className="relative z-10 flex flex-col items-center gap-6 pointer-events-none">
            <div 
              className={`badge-medallion ${selectedBadge.toneClass} w-48 h-48 rounded-full shadow-2xl flex items-center justify-center spin-3d relative overflow-hidden`}
              aria-label={`${selectedBadge.name} badge`}
            >
              <img 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" 
                alt={selectedBadge.alt} 
                className="badge-logo w-2/3 h-2/3 object-contain select-none" 
                draggable="false"
              />
              <span className="badge-sweep" aria-hidden="true"></span>
            </div>
            <h3 className="font-pixel text-white text-base text-center tracking-tight drop-shadow-md bg-slate-900/50 px-4 py-2 rounded hidden" aria-hidden="true">
              {selectedBadge.name}
            </h3>
          </div>
        )}

        <button onClick={closeModal} className="absolute top-6 right-6 text-white bg-slate-900/50 hover:bg-slate-900 p-2 rounded-full transition-colors z-20">
          <iconify-icon icon="solar:close-circle-linear" width="32"></iconify-icon>
        </button>
      </div>
    </>
  );
}