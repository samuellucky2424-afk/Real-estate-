
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar.tsx';
import AdminPropertyForm from './AdminPropertyForm.tsx';
import { Property } from '../../types.ts';
import { PencilIcon, TrashIcon, MenuIcon, HomeIcon } from '../icons.tsx';

interface AdminDashboardProps {
    properties: Property[];
    onAddProperty: (property: Omit<Property, 'id'>) => void;
    onUpdateProperty: (property: Property) => void;
    onDeleteProperty: (id: number) => void;
    onLogout: () => void;
}

type AdminView = 'dashboard' | 'add' | 'edit';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ properties, onAddProperty, onUpdateProperty, onDeleteProperty, onLogout }) => {
    const [view, setView] = useState<AdminView>('dashboard');
    const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleEditClick = (property: Property) => {
        setPropertyToEdit(property);
        setView('edit');
    };

    const handleSaveProperty = (property: Omit<Property, 'id'> | Property) => {
        if ('id' in property) {
            onUpdateProperty(property);
        } else {
            onAddProperty(property);
        }
        setView('dashboard');
        setPropertyToEdit(null);
    };

    const handleCancelForm = () => {
        setView('dashboard');
        setPropertyToEdit(null);
    };
    
    const handleSetView = (view: 'dashboard' | 'add') => {
        setView(view);
        setPropertyToEdit(null);
        setIsSidebarOpen(false); // Close sidebar on navigation
    };

    const renderView = () => {
        switch (view) {
            case 'add':
                return <AdminPropertyForm onSave={handleSaveProperty} onCancel={handleCancelForm} />;
            case 'edit':
                 return <AdminPropertyForm propertyToEdit={propertyToEdit} onSave={handleSaveProperty} onCancel={handleCancelForm} />;
            case 'dashboard':
            default:
                return (
                    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-brand-blue mb-6">Manage Properties</h2>
                        
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b bg-slate-50">
                                    <tr>
                                        <th className="p-4 font-semibold text-sm text-slate-600 uppercase">Name</th>
                                        <th className="p-4 font-semibold text-sm text-slate-600 uppercase">Location</th>
                                        <th className="p-4 font-semibold text-sm text-slate-600 uppercase">Price</th>
                                        <th className="p-4 font-semibold text-sm text-slate-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map(prop => (
                                        <tr key={prop.id} className="border-b hover:bg-slate-50">
                                            <td className="p-4 font-medium">{prop.name}</td>
                                            <td className="p-4 text-slate-600">{prop.location}</td>
                                            <td className="p-4 text-slate-600">{prop.price}</td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditClick(prop)} className="text-blue-600 hover:text-blue-800 p-1" aria-label="Edit"><PencilIcon className="h-5 w-5" /></button>
                                                    <button onClick={() => onDeleteProperty(prop.id)} className="text-red-600 hover:text-red-800 p-1" aria-label="Delete"><TrashIcon className="h-5 w-5" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {properties.map(prop => (
                                <div key={prop.id} className="border rounded-lg p-4 bg-slate-50/50 shadow-sm">
                                    <h3 className="font-bold text-lg text-brand-blue">{prop.name}</h3>
                                    <p className="text-sm text-slate-600">{prop.location}</p>
                                    <p className="text-md font-semibold text-slate-800 mt-2">{prop.price}</p>
                                    <div className="flex gap-4 mt-4 border-t pt-3">
                                        <button onClick={() => handleEditClick(prop)} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 p-1" aria-label="Edit">
                                            <PencilIcon className="h-4 w-4" /> Edit
                                        </button>
                                        <button onClick={() => onDeleteProperty(prop.id)} className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 p-1" aria-label="Delete">
                                            <TrashIcon className="h-4 w-4" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    }

    return (
       <div className="relative min-h-screen md:flex bg-brand-light font-sans">
          {/* Mobile overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translateX(0)' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
            <AdminSidebar onLogout={onLogout} setView={handleSetView} closeSidebar={() => setIsSidebarOpen(false)} />
          </div>

          {/* Main content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
             {/* Mobile Header */}
            <header className="md:hidden flex justify-between items-center mb-6 pb-4 border-b">
                <a href="#/" className="flex items-center gap-2">
                    <HomeIcon className="h-6 w-6 text-brand-blue" />
                    <span className="text-xl font-serif font-bold text-brand-blue">Luxe</span>
                </a>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-slate-200">
                    <MenuIcon className="h-6 w-6 text-slate-800" />
                </button>
            </header>
            
            {renderView()}
          </main>
        </div>
    );
};

export default AdminDashboard;