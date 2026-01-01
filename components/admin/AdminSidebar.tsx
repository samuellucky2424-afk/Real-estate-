
import React from 'react';
import { HomeIcon, DashboardIcon, PlusIcon, LogoutIcon } from '../icons.tsx';

interface AdminSidebarProps {
  onLogout: () => void;
  setView: (view: 'dashboard' | 'add') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout, setView }) => {
  return (
    <aside className="w-64 bg-brand-blue text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <a href="#/" className="flex items-center gap-2">
            <HomeIcon className="h-8 w-8 text-white" />
            <span className="text-xl font-serif font-bold">Luxe Properties</span>
        </a>
        <span className="text-sm text-slate-300">Admin Panel</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => setView('dashboard')} className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-slate-200 hover:bg-white/10 transition-colors">
          <DashboardIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </button>
        <button onClick={() => setView('add')} className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-slate-200 hover:bg-white/10 transition-colors">
          <PlusIcon className="h-5 w-5" />
          <span>Add Property</span>
        </button>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-slate-200 hover:bg-white/10 transition-colors">
          <LogoutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
