
import React, { useState } from 'react';
import { HomeIcon } from '../icons';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a secure API call.
    // For this demo, we use a simple hardcoded password.
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <a href="#/" className="flex items-center gap-2 justify-center">
            <HomeIcon className="h-8 w-8 text-brand-blue" />
            <span className="text-2xl font-serif font-bold text-brand-blue">Luxe Properties</span>
        </a>
        <h1 className="text-2xl font-bold text-slate-700 mt-2">Admin Panel</h1>
      </div>
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-brand-blue mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
              required
            />
             <p className="text-xs text-slate-500 mt-1">Hint: The password is `admin123`</p>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
