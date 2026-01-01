
import React, { useState, useEffect } from 'react';
import { Property, ListingCategory } from '../../types';

interface AdminPropertyFormProps {
  propertyToEdit?: Property | null;
  onSave: (property: Omit<Property, 'id'> | Property) => void;
  onCancel: () => void;
}

const AdminPropertyForm: React.FC<AdminPropertyFormProps> = ({ propertyToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    description: '',
    category: ListingCategory.House,
    image: '',
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
  });

  useEffect(() => {
    if (propertyToEdit) {
      setFormData({
        name: propertyToEdit.name,
        price: propertyToEdit.price,
        location: propertyToEdit.location,
        description: propertyToEdit.description,
        category: propertyToEdit.category,
        image: propertyToEdit.image,
        bedrooms: propertyToEdit.bedrooms ?? 0,
        bathrooms: propertyToEdit.bathrooms ?? 0,
        sqft: propertyToEdit.sqft ?? 0,
      });
    }
  }, [propertyToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'sqft' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyToEdit) {
      onSave({ ...propertyToEdit, ...formData });
    } else {
      onSave(formData);
    }
  };
  
  const formTitle = propertyToEdit ? 'Edit Property' : 'Add New Property';

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-brand-blue mb-6">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Property Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full input-style"/>
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price (e.g., ₦450,000,000)</label>
                <input type="text" name="price" id="price" required value={formData.price} onChange={handleChange} className="mt-1 block w-full input-style"/>
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
                <input type="text" name="location" id="location" required value={formData.location} onChange={handleChange} className="mt-1 block w-full input-style"/>
            </div>
             <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                <select name="category" id="category" required value={formData.category} onChange={handleChange} className="mt-1 block w-full input-style">
                    {Object.values(ListingCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-slate-700">Image URL</label>
                <input type="text" name="image" id="image" required value={formData.image} onChange={handleChange} className="mt-1 block w-full input-style"/>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea name="description" id="description" rows={4} required value={formData.description} onChange={handleChange} className="mt-1 block w-full input-style"></textarea>
            </div>
             <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-700">Bedrooms</label>
                <input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleChange} className="mt-1 block w-full input-style"/>
            </div>
             <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-slate-700">Bathrooms</label>
                <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} className="mt-1 block w-full input-style"/>
            </div>
             <div>
                <label htmlFor="sqft" className="block text-sm font-medium text-slate-700">Square Meters (sqm)</label>
                <input type="number" name="sqft" id="sqft" value={formData.sqft} onChange={handleChange} className="mt-1 block w-full input-style"/>
            </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-300">
            Cancel
          </button>
          <button type="submit" className="bg-brand-gold text-white px-4 py-2 rounded-md hover:bg-opacity-90">
            Save Property
          </button>
        </div>
      </form>
      <style>{`.input-style { border: 1px solid #cbd5e1; border-radius: 0.375rem; padding: 0.5rem 0.75rem; } .input-style:focus { outline: none; box-shadow: 0 0 0 2px #D4AF37; border-color: #D4AF37; }`}</style>
    </div>
  );
};

export default AdminPropertyForm;
