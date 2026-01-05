import React, { useState, useRef } from 'react';

interface HeroProps {
  onOpenChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Normalized mouse position for parallax effects (-0.5 to 0.5)
  const getParallax = () => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (mousePos.x / rect.width) - 0.5,
      y: (mousePos.y / rect.height) - 0.5
    };
  };

  const parallax = getParallax();
  const faceImg = "/hero-image.png";

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-background-light dark:bg-background-dark group"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-20" />

        {/* Large Minimal Background Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none"
          style={{
            transform: `translate(${parallax.x * -50}px, ${parallax.y * -50}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        >
          <h2 className="font-display text-[35vw] font-black uppercase tracking-tighter leading-none opacity-[0.03] dark:opacity-[0.05] stroke-text">
            SUYASH
          </h2>
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.05), transparent 80%)`,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 dark:block hidden"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 80%)`,
          }}
        />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            opacity: 0.1,
            color: 'inherit'
          }}
        />
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-difference opacity-20 dark:opacity-40">
        <div
          className="relative w-full md:w-[60vw] h-full overflow-hidden"
          style={{
            transform: `translate(${parallax.x * 30}px, ${parallax.y * 30}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="glitch-layer" style={{ backgroundImage: `url(${faceImg})`, filter: 'blur(2px)' }} />
          <div
            className="glitch-layer animate-[glitch-horizontal_5s_infinite_linear] opacity-40"
            style={{
              backgroundImage: `url(${faceImg})`,
              clipPath: 'polygon(0 20%, 100% 20%, 100% 35%, 0 35%)',
              transform: 'translateX(20px)',
              filter: 'blur(2px)'
            }}
          />
          <div
            className="glitch-layer animate-[slit-scan_8s_infinite_ease-in-out]"
            style={{
              backgroundImage: `url(${faceImg})`,
              clipPath: 'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
              filter: 'grayscale(1) contrast(2) brightness(1.2) blur(2px)'
            }}
          />
          <div
            className="glitch-layer animate-[glitch-horizontal_3s_infinite_linear_reverse]"
            style={{
              backgroundImage: `url(${faceImg})`,
              clipPath: 'polygon(0 75%, 100% 75%, 100% 85%, 0 85%)',
              transform: 'translateX(-30px)',
              filter: 'blur(2px)'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-end justify-between w-full h-full gap-8">
        <div className="w-full md:w-2/3 fade-in">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-8 text-gray-500 dark:text-gray-400 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-current"></span>
            [ FRONT END & UI/UX — CONTINUOUS LEARNING ]
          </p>
          <h1 className="font-display text-[12vw] md:text-[7vw] font-bold leading-[0.85] uppercase tracking-tighter mb-4">
            Design<br />
            <span className="stroke-text dark:text-white text-black">In Motion</span><br />
            Code In Flow.
          </h1>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right pb-4 fade-in [animation-delay:0.3s]">
          <div className="max-w-xs space-y-6">
            <p className="font-sans text-lg md:text-xl font-light text-gray-700 dark:text-gray-300">
              Transforming complex systems into intuitive digital experiences through constant evolution.
            </p>
            <div className="flex flex-col space-y-2 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center md:justify-end gap-2 hover:text-black dark:hover:text-white transition-colors">
                Front End Mastery <span className="w-1 h-1 bg-current rounded-full"></span>
              </span>
              <span className="flex items-center md:justify-end gap-2 hover:text-black dark:hover:text-white transition-colors">
                UI/UX Evolutionary Design <span className="w-1 h-1 bg-current rounded-full"></span>
              </span>
              <span className="flex items-center md:justify-end gap-2 hover:text-black dark:hover:text-white transition-colors">
                PRAYAGRAJ, INDIA <span className="w-1 h-1 bg-current rounded-full"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mt-20 md:mt-0 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
        <div className="hidden md:block">
          Driven by continuous exploration
        </div>
        <div
          className="group flex flex-col items-center cursor-pointer animate-pulse hover:animate-none"
          onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">View Evolution</span>
          <div className="w-[1px] h-12 bg-gray-300 dark:bg-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-black dark:bg-white animate-[scroll-indicator_2s_infinite]"></div>
          </div>
        </div>
        <button
          onClick={onOpenChat}
          className="hidden md:block text-right hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          Status: [ <span className="underline underline-offset-4 font-bold">Always Learning</span> ]
        </button>
      </div>

      <style>{`
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </header>
  );
};

export default Hero;