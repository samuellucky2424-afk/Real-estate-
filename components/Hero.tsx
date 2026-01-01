
import React from 'react';

const Hero: React.FC = () => {
  const scrollToProperties = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#properties')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section id="home" className="relative h-screen min-h-[500px] flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&h=900&auto=format&fit=crop" alt="Modern Nigerian home exterior" className="absolute inset-0 w-full h-full object-cover"/>
      
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
          Find Your Perfect Home with Confidence
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200">
          Your trusted partner in buying, selling, and renting exceptional properties. Let us guide you home.
        </p>
        <a 
          href="#properties" 
          onClick={scrollToProperties}
          className="bg-brand-gold text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          View Properties
        </a>
      </div>
    </section>
  );
};

export default Hero;