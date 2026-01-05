
import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    year: '2024',
    name: 'Canvas',
    role: 'Product Designer & Full-Stack',
    description: 'The High-Performance Site Builder',
    image: '/saas-project.png',
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://example.com/cms',
    repoUrl: 'https://github.com/Suyash321/saas-cms',
    caseStudy: "Canvas isn't just a tool; it's a vision for a structurally sound internet. Built by architects who believe integrity should never be a compromise. This high-performance site builder connects core structural elements with a visionary design interface, offering a seamless workflow for creators who demand excellence."
  },
  {
    year: '2024',
    name: 'Modern E-Commerce',
    role: 'Product Designer & Full-Stack',
    description: 'Scalable MERN solution with a focus on conversion and speed.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    liveUrl: 'https://example.com/ecommerce',
    repoUrl: 'https://github.com/Suyash321/mern-ecommerce',
    caseStudy: 'Developed a full-cycle e-commerce platform including secure authentication, Stripe/Razorpay integration, and a high-performance admin dashboard. Achieved 40% performance improvement through code optimization and image lazy-loading. Deployed on AWS EC2 with a full CI/CD pipeline. The user interface was rigorously tested with A/B variants to ensure maximum conversion rate and user satisfaction across all devices.'
  },
  {
    year: '2023',
    name: 'Learning Hut',
    role: 'UI/UX & Frontend Developer',
    description: 'Educational platform built for student engagement.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    liveUrl: 'https://learninghut.netlify.app/',
    caseStudy: 'Developed a responsive educational platform designed to foster student engagement. The platform features a clean, accessible UI for course browsing. The focus was on creating a welcoming digital environment with semantic HTML and modern CSS layout techniques to ensure optimal performance across all devices.'
  },
  {
    year: '2023',
    name: 'Event Booking Signal',
    role: 'Product Designer & Frontend',
    description: 'Visual booking platform for the photography industry.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    technologies: ['Figma', 'React', 'JavaScript'],
    liveUrl: 'https://example.com/booking',
    caseStudy: 'Addressed friction in event photography booking. Developed an intuitive calendar system and sleek professional profiles. Through iterative testing in Figma and implementation in React, we reduced booking drop-off rates by 30%. The final solution allows photographers to manage their entire schedule and client communication within a single, high-performance dashboard.'
  },
  {
    year: '2022',
    name: 'Sidcup Family Golf',
    role: 'Frontend Developer',
    description: 'Immersive website for a premium golf facility.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800',
    technologies: ['GSAP', 'HTML5', 'CSS3', 'JavaScript'],
    liveUrl: 'https://suyash321.github.io/sidcupgolf/',
    caseStudy: 'A visually immersive clone of the Sidcup Family Golf website, featuring Toptracer Range technology and Adventure Golf. This project focuses on high-end frontend interactions using GSAP for smooth animations and a custom cursor. It replicates the premium feel of the facility through a modern, responsive interface and interactive design elements.'
  },
  {
    year: '2024',
    name: 'Interior Design',
    role: 'UI/UX Designer',
    description: 'Modern interior design concept and prototype.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    technologies: ['Figma', 'Prototyping'],
    liveUrl: 'https://www.figma.com/proto/TCCyex46FEcVZ9cNiHihsC/interior-design?node-id=0-1&t=QPsSfW5aGrN7Y9bL-1',
    caseStudy: 'A high-fidelity prototype designed in Figma demonstrating a modern, minimalist approach to interior design portfolios. Focuses on visual storytelling and smooth micro-interactions to showcase architectural work effectively.'
  },
];

const WorkRow: React.FC<{ project: Project; index: number; isExpanded: boolean; onToggle: () => void }> = ({ project, index, isExpanded, onToggle }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) {
      setIsCaseStudyExpanded(false);
    }
  }, [isExpanded]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    }
  };

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleCaseStudy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCaseStudyExpanded(!isCaseStudyExpanded);
  };

  return (
    <div className="relative border-b border-border-light dark:border-border-dark overflow-hidden group/row" ref={rowRef} onMouseMove={handleMouseMove}>
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out z-0 overflow-hidden ${isExpanded ? 'opacity-5' : 'opacity-0 group-hover/row:opacity-10 dark:group-hover/row:opacity-20'}`}
      >
        <div
          className="absolute inset-[-10%] bg-cover bg-center grayscale contrast-125"
          style={{
            backgroundImage: `url(${project.image})`,
            transform: `translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px) scale(1.1)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-background-light/40 dark:bg-background-dark/40" />
      </div>

      <div
        className={`relative z-10 md:grid grid-cols-12 gap-4 py-12 items-baseline transition-all duration-500 cursor-pointer px-4 ${isExpanded ? 'bg-black/[0.05] dark:bg-white/[0.05]' : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'}`}
        onClick={onToggle}
      >
        <div className="col-span-1 font-mono text-xs text-gray-400">0{index + 1}</div>
        <div className="col-span-2 font-mono text-sm text-gray-500">{project.year}</div>
        <div className="col-span-5">
          <h4 className={`font-display text-3xl md:text-5xl font-bold uppercase transition-all duration-700 ease-out ${isExpanded ? 'translate-x-4' : 'translate-x-[-1rem] group-hover/row:translate-x-0'}`}>
            {project.name}
          </h4>
          <div className={`mt-2 transition-all duration-500 ease-out ${isExpanded ? 'opacity-100' : 'opacity-0 translate-y-1 group-hover/row:opacity-100 group-hover/row:translate-y-0 delay-100'}`}>
            <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2 py-0.5 border border-border-light dark:border-border-dark font-mono text-[8px] uppercase tracking-wider rounded-full bg-black/5 dark:bg-white/5 group-hover/row:border-black/20 dark:group-hover/row:border-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4 text-right flex items-center justify-end gap-6 mt-4 md:mt-0">
          <div className="hidden lg:block text-right font-mono text-[10px] uppercase tracking-wider opacity-40 group-hover/row:opacity-100 transition-opacity">
            {project.role}
          </div>

          {project.liveUrl && (
            <button
              onClick={handleLiveClick}
              className="flex items-center gap-2 px-4 py-2 border border-black dark:border-white font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group/live shrink-0"
            >
              <span>Live</span>
              <svg className="w-3 h-3 group-hover/live:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
          )}

          <div className={`w-10 h-10 flex items-center justify-center border border-current rounded-full transition-transform duration-500 shrink-0 ${isExpanded ? 'rotate-45 bg-black text-white dark:bg-white dark:text-black' : 'group-hover/row:scale-110'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </div>
        </div>
      </div>

      <div
        className={`relative z-10 overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-12 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md">
          <div className="col-span-1 md:col-span-5 space-y-8">
            <div className="aspect-[4/3] overflow-hidden border border-border-light dark:border-border-dark group/img shadow-2xl">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover/img:scale-110 group-hover/img:grayscale-0"
              />
            </div>
            <div className="space-y-4">
              <h5 className="font-mono text-xs uppercase text-gray-500 tracking-widest">[ Core Stack Architecture ]</h5>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 border border-border-light dark:border-border-dark font-mono text-[10px] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">{tech}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-7 space-y-8">
            <div>
              <h5 className="font-mono text-xs uppercase text-gray-500 tracking-widest mb-4">[ Project Outcome ]</h5>
              <div className="relative">
                <p className={`font-sans text-xl md:text-3xl font-light text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-500 ${!isCaseStudyExpanded ? 'line-clamp-3 md:line-clamp-4' : ''}`}>
                  {project.caseStudy}
                </p>
                <button
                  onClick={toggleCaseStudy}
                  className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] border-b border-black dark:border-white pb-1 hover:opacity-50 transition-all group/read"
                >
                  <span className="relative overflow-hidden inline-block h-[1.2em]">
                    <span className={`inline-block transition-transform duration-500 ${isCaseStudyExpanded ? '-translate-y-full' : 'translate-y-0'}`}>Read More</span>
                    <span className={`absolute top-0 left-0 inline-block transition-transform duration-500 ${isCaseStudyExpanded ? 'translate-y-0' : 'translate-y-full'}`}>Read Less</span>
                  </span>
                  <svg className={`w-3 h-3 transition-transform duration-500 ${isCaseStudyExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="pt-8 flex flex-wrap gap-6 items-center">
              {project.liveUrl && (
                <button
                  onClick={handleLiveClick}
                  className="group relative px-10 py-5 bg-black dark:bg-white text-white dark:text-black font-mono text-[10px] uppercase tracking-widest overflow-hidden transition-all hover:pr-14"
                >
                  <span className="relative z-10">Live Deployment</span>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </button>
              )}
              {project.repoUrl && (
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(project.repoUrl, '_blank'); }}
                  className="px-8 py-5 border border-border-light dark:border-border-dark font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  Source Code
                </button>
              )}
              <button className="px-8 py-5 border border-border-light dark:border-border-dark font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                Case Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      className="py-32 px-4 md:px-12 border-t border-border-light dark:border-border-dark relative"
      id="work"
    >
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-24">
        <div className="fade-in">
          <h3 className="font-display text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-4">
            Selected<br />Work
          </h3>
          <p className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.3em]">
            [ Case Studies × Technical Implementations ]
          </p>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mt-8 md:mt-0 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-gray-300 dark:bg-gray-800"></span>
          Interact to explore architecture
        </div>
      </div>

      <div className="relative z-10 border-t border-gray-400 dark:border-gray-700">
        {projects.map((project, index) => (
          <WorkRow
            key={index}
            project={project}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => toggleProject(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
