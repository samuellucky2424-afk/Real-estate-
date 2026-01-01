
import React from 'react';
import { HomeIcon, DashboardIcon, PlusIcon, LogoutIcon, XIcon } from '../icons.tsx';

interface AdminSidebarProps {
  onLogout: () => void;
  setView: (view: 'dashboard' | 'add') => void;
  closeSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout, setView, closeSidebar }) => {
  return (
    <aside className="w-64 h-full bg-brand-blue text-white flex flex-col">
       <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <a href="#/" className="flex items-center gap-2">
            <HomeIcon className="h-8 w-8 text-white" />
            <span className="text-xl font-serif font-bold">Luxe Properties</span>
        </a>
         <button onClick={closeSidebar} className="md:hidden text-slate-300 hover:text-white">
            <XIcon className="h-6 w-6" />
         </button>
      </div>
      <div className="p-4 border-b border-white/10 md:hidden">
          <span className="text-sm text-slate-300 uppercase font-bold">Admin Panel</span>
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