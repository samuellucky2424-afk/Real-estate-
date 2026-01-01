
import React from 'react';
import { ShieldCheckIcon, UsersIcon, ZapIcon } from './icons';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="inline-block bg-brand-gold/10 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-brand-blue mb-2">{title}</h3>
    <p className="text-slate-600">{children}</p>
  </div>
);

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-blue">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">We provide a seamless and trustworthy experience from start to finish.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<UsersIcon className="h-8 w-8 text-brand-gold" />}
            title="Trusted Agents"
          >
            Our team of experienced and dedicated agents is here to provide expert advice and personalized service.
          </FeatureCard>
          <FeatureCard 
            icon={<ShieldCheckIcon className="h-8 w-8 text-brand-gold" />}
            title="Verified Properties"
          >
            Every listing is thoroughly vetted to ensure quality, safety, and value for your investment.
          </FeatureCard>
          <FeatureCard 
            icon={<ZapIcon className="h-8 w-8 text-brand-gold" />}
            title="Fast Process"
          >
            We leverage technology and streamlined processes to make your transaction as quick and efficient as possible.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;