
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://i.imghippo.com/files/ua6388Ag.jpg" 
              alt="Professional real estate agent" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover" 
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-brand-blue mb-4">About Your Agent</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              With over a decade of experience in the Lagos luxury real estate market, our lead agent combines deep industry knowledge with an unwavering commitment to client satisfaction. We understand that buying or selling a home is more than just a transaction: it’s a life-changing experience. 
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              That’s why we provide exceptional, personalized service for all of our clients. We take great pride in the relationships we build and always work relentlessly on the client’s behalf to help them achieve their real estate goals. Our philosophy is simple: clients come first.
            </p>
            <a href="#contact" className="bg-brand-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;