
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (name === 'email' && errors.email) {
      setErrors({ email: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address (e.g., name@example.com).' });
      return;
    }

    // In a real app, you would handle form submission here (e.g., API call)
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setErrors({ email: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-blue">Contact Us</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Have questions or ready to start your journey? Reach out to us.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 bg-brand-light p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-brand-blue mb-6">Get in Touch Directly</h3>
            <div className="space-y-4">
              <p className="flex items-center gap-4">
                <span className="bg-brand-gold/10 p-3 rounded-full">📞</span>
                <a href="tel:+2348012345678" className="text-slate-700 hover:text-brand-blue">+234 801 234 5678</a>
              </p>
              <p className="flex items-center gap-4">
                <span className="bg-brand-gold/10 p-3 rounded-full">📧</span>
                <a href="mailto:agent@luxeproperties.ng" className="text-slate-700 hover:text-brand-blue">agent@luxeproperties.ng</a>
              </p>
              <p className="flex items-center gap-4">
                <span className="bg-brand-gold/10 p-3 rounded-full">📍</span>
                <span className="text-slate-700">123 Luxury Avenue, Ikoyi, Lagos</span>
              </p>
            </div>
            <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
              Message on WhatsApp
            </a>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-brand-blue mb-6">Send an Inquiry</h3>
            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Thank you!</strong>
                <span className="block sm:inline"> Your message has been sent successfully. We will get back to you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-brand-gold focus:border-brand-gold'} rounded-md shadow-sm focus:outline-none`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                  <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-brand-gold text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md active:scale-[0.98]">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
