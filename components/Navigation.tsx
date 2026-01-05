
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white px-6 py-4 flex justify-between items-center border-b border-white/10 backdrop-blur-sm">
      <div className="font-display font-bold text-xl tracking-tighter uppercase">
        SUYASH <span className="font-light">TIWARI</span>
      </div>
      <div className="hidden md:flex space-x-12 font-mono text-xs tracking-widest uppercase">
        <a className="hover:opacity-50 transition-opacity" href="#about">About</a>
        <a className="hover:opacity-50 transition-opacity" href="#work">Work</a>
        <a className="hover:opacity-50 transition-opacity" href="#services">Services</a>
        <a className="hover:opacity-50 transition-opacity" href="#contact">Contact</a>
      </div>
      <div className="font-mono text-xs hidden sm:block">
        PRAYAGRAJ, INDIA
      </div>
    </nav>
  );
};

export default Navigation;
