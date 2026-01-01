
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Luxe Properties Demo. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Replace with actual social links */}
            <a href="#" className="hover:opacity-80 transition-opacity">Facebook</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Twitter</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Instagram</a>
            <a href="#/admin" className="hover:opacity-80 transition-opacity border-l pl-4">Admin Login</a>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          This is a demo website for portfolio purposes. Information and listings are fictional.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
