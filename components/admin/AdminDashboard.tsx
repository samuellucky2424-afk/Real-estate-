
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar.tsx';
import AdminPropertyForm from './AdminPropertyForm.tsx';
import { Property } from '../../types.ts';
import { PencilIcon, TrashIcon } from '../icons.tsx';

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

    const renderView = () => {
        switch (view) {
            case 'add':
                return <AdminPropertyForm onSave={handleSaveProperty} onCancel={handleCancelForm} />;
            case 'edit':
                 return <AdminPropertyForm propertyToEdit={propertyToEdit} onSave={handleSaveProperty} onCancel={handleCancelForm} />;
            case 'dashboard':
            default:
                return (
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-brand-blue mb-6">Manage Properties</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b">
                                    <tr>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Location</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Actions</th>
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
                    </div>
                );
        }
    }

    return (
        <div className="min-h-screen flex bg-brand-light">
            <AdminSidebar onLogout={onLogout} setView={(v) => { setView(v); setPropertyToEdit(null); }} />
            <main className="flex-1 p-8 overflow-auto">
                {renderView()}
            </main>
        </div>
    );
};

export default AdminDashboard;
