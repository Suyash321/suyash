import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Work from './components/Work';
import ChatAssistant from './components/ChatAssistant';

const ExpertisePill: React.FC<{ category: string; description: string; index: number }> = ({ category, description, index }) => {
  return (
    <div className="group relative border border-border-light dark:border-border-dark rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 ease-out hover:-translate-y-1 cursor-default">
      <div className="flex justify-between items-start">
        <span className="font-mono text-[10px] text-gray-400 group-hover:text-gray-500 uppercase tracking-widest transition-colors">
          [{String(index + 1).padStart(2, '0')}]
        </span>
        <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-green-500 transition-colors" />
      </div>
      
      <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight leading-none">
        {category}
      </h3>
      
      <p className="font-mono text-[11px] md:text-[12px] leading-relaxed text-gray-500 dark:text-gray-400 group-hover:text-white/80 dark:group-hover:text-black/80 transition-colors">
        {description}
      </p>
      
      <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const expertiseData = [
    {
      category: "Front End Engineering",
      description: "Deepening my mastery in JavaScript (ES6+), React, and performance-driven web development. I focus on building scalable, clean, and interactive interfaces."
    },
    {
      category: "UI/UX Design Systems",
      description: "Crafting intuitive user experiences in Figma. I am currently expanding my skills in design systems, accessibility audits, and user-centric prototypes."
    },
    {
      category: "Continuous Growth",
      description: "A committed lifelong learner. I am constantly evolving my technical stack and design vocabulary to stay ahead of industry standards."
    },
    {
      category: "Strategic Foundation",
      description: "Leveraging my background in US IT market consulting to bring a business-first perspective to product development and system design."
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-black dark:text-white transition-colors duration-300">
      <div 
        className="fixed top-0 left-0 h-1 bg-black dark:bg-white z-[100] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Navigation />
      
      <main>
        <Hero onOpenChat={() => setIsChatOpen(true)} />

        {/* About Section */}
        <section className="py-40 px-6 md:px-12 border-t border-border-light dark:border-border-dark bg-white dark:bg-surface-dark" id="about">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="col-span-1 md:col-span-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-8">[ PROFILE.01 ]</h2>
              <div className="space-y-4">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  BCA: ECC, PRAYAGRAJ
                </p>
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  MCA: LPU, PUNJAB
                </p>
              </div>
            </div>
            <div className="col-span-1 md:col-span-8">
              <div className="space-y-8 mb-16">
                <p className="font-display text-4xl md:text-5xl leading-tight uppercase font-bold tracking-tight">
                  I am a hybrid specialist focused on <span className="stroke-text dark:text-white text-black">Front End Engineering & UI/UX Design.</span>
                </p>
                <p className="font-sans text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Design is not just about aesthetics; it is a functional architecture. With an academic background in BCA and MCA, I am currently dedicated to an intense journey of continuous learning—mastering the synergy between complex code and intuitive design.
                </p>
                <p className="font-sans text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  My dual experience as a Technical Talent Consultant at Radiance Technologies gives me a unique vantage point on the US IT market. I don't just build products; I evolve them with a deep understanding of user needs and engineering excellence.
                </p>
              </div>

              {/* Refactored Expertise Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertiseData.map((item, idx) => (
                  <ExpertisePill 
                    key={idx} 
                    category={item.category} 
                    description={item.description} 
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Work />

        {/* My Process Section */}
        <section className="py-40 px-4 md:px-12 bg-surface-light dark:bg-surface-dark text-black dark:text-white border-t border-border-light dark:border-border-dark" id="services">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="col-span-1 md:col-span-3">
              <h3 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter">/Method</h3>
              <p className="font-mono text-xs mt-8 max-w-[200px] uppercase tracking-widest text-gray-500 leading-loose">
                Every project is a step in my evolutionary cycle of research, design, and development.
              </p>
            </div>
            <div className="col-span-1 md:col-span-9">
              <div className="space-y-32">
                {[
                  { title: "Research", desc: "Understanding the human element. I dive deep into user behavior and business requirements to set the foundation for evolution.", id: "01" },
                  { title: "Prototype", desc: "Translating ideas into interactive design systems. Using Figma to build high-fidelity blueprints for future code.", id: "02" },
                  { title: "Iterate", desc: "Growth through feedback. I refine every pixel and function through usability testing and continuous performance audits.", id: "03" },
                  { title: "Evolve", desc: "Deploying production-ready code with React and modern front-end tools, ensuring the final product is as powerful as it is beautiful.", id: "04" }
                ].map((service, i) => (
                  <div key={i} className="group flex flex-col md:flex-row gap-8 items-start hover:pl-4 transition-all duration-500">
                    <span className="font-mono text-lg opacity-20 group-hover:opacity-100 transition-opacity">[{service.id}]</span>
                    <div>
                      <h2 className="text-6xl md:text-[100px] font-display font-bold uppercase tracking-tighter leading-none mb-4 group-hover:stroke-text group-hover:dark:text-white transition-all duration-500">
                        {service.title}
                      </h2>
                      <p className="font-mono text-sm md:text-lg max-w-xl text-gray-500 dark:text-gray-400 mt-6">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-background-light dark:bg-background-dark text-black dark:text-white pt-32 pb-8 px-6 md:px-12 border-t border-border-light dark:border-border-dark relative overflow-hidden" id="contact">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 border-b border-gray-300 dark:border-gray-800 pb-16">
            <h2 className="font-display text-7xl md:text-[100px] font-bold uppercase tracking-tighter leading-[0.85]">
              Let's build<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-black dark:from-gray-600 dark:to-white">The Future</span>
            </h2>
            <div className="font-mono text-xs uppercase tracking-widest text-gray-500 mt-12 md:mt-0">
              [ Committed to Continuous Growth ]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-mono text-xs uppercase tracking-widest mb-32">
            <div>
              <h4 className="text-gray-400 mb-6">Location</h4>
              <p>PRAYAGRAJ, INDIA</p>
              <p className="mt-2 text-gray-500">Universal Time [GMT+5:30]</p>
            </div>
            <div>
              <h4 className="text-gray-400 mb-6">Signal</h4>
              <a className="block hover:line-through" href="mailto:suyashtiwari673@gmail.com">suyashtiwari673@gmail.com</a>
              <a className="block mt-2 hover:line-through" href="https://www.linkedin.com/in/suyash-tiwari-44553a23b/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </div>
            <div>
              <h4 className="text-gray-400 mb-6">Network</h4>
              <ul className="space-y-2">
                <li><a className="hover:opacity-50 transition-opacity" href="https://www.linkedin.com/in/suyash-tiwari-44553a23b/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a className="hover:opacity-50 transition-opacity" href="https://github.com/Suyash321" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a className="hover:opacity-50 transition-opacity" href="https://dribbble.com/suyashtiwari" target="_blank" rel="noopener noreferrer">Dribbble</a></li>
              </ul>
            </div>
            <div className="md:text-right flex flex-col justify-end">
               <a href="mailto:suyashtiwari673@gmail.com" className="group relative inline-flex items-center gap-4 bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-sm font-bold uppercase tracking-widest hover:invert transition-all">
                  <span>Start a Project</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
               </a>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-gray-300 dark:border-gray-800 pt-8">
            <h1 className="font-display text-[15vw] leading-none font-bold tracking-tighter uppercase">SUYASH</h1>
            <div className="font-mono text-[10px] text-gray-400 flex flex-col gap-1 items-end">
              <span>SUYASH TIWARI — FRONT END & UI/UX DESIGNER</span>
              <span>© 2025 VERSION 4.2.0</span>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed top-8 right-8 z-[100] flex gap-4">
        <button 
          className="bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Toggle System Environment"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          )}
        </button>
      </div>

      <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;