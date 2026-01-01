
import React, { useState, useEffect, useRef } from 'react';
import { Property, ListingCategory } from '../../types.ts';

interface AdminPropertyFormProps {
  propertyToEdit?: Property | null;
  onSave: (property: Omit<Property, 'id'> | Property) => void;
  onCancel: () => void;
}

const AdminPropertyForm: React.FC<AdminPropertyFormProps> = ({ propertyToEdit, onSave, onCancel }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
      // If the current image looks like base64, assume it was an upload
      if (propertyToEdit.image.startsWith('data:image')) {
        setUploadedImage(propertyToEdit.image);
      }
    }
  }, [propertyToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'sqft' ? Number(value) : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUpload = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = uploadedImage || formData.image;
    
    if (!finalImage) {
      alert("Please provide an image URL or upload an image.");
      return;
    }

    const payload = { ...formData, image: finalImage };

    if (propertyToEdit) {
      onSave({ ...propertyToEdit, ...payload });
    } else {
      onSave(payload);
    }
  };
  
  const formTitle = propertyToEdit ? 'Edit Property' : 'Add New Property';
  const previewSource = uploadedImage || formData.image;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-brand-blue mb-6">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="md:col-span-2 space-y-4">
                <label className="block text-sm font-medium text-slate-700">Property Image</label>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label htmlFor="image" className="block text-xs text-slate-500 mb-1 italic">Option 1: Image URL</label>
                      <input 
                        type="text" 
                        name="image" 
                        id="image" 
                        placeholder="https://example.com/image.jpg"
                        disabled={!!uploadedImage}
                        value={formData.image} 
                        onChange={handleChange} 
                        className={`block w-full input-style ${uploadedImage ? 'bg-slate-50 opacity-50' : ''}`}
                      />
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-bold">Or</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <div>
                      <label htmlFor="imageUpload" className="block text-xs text-slate-500 mb-1 italic">Option 2: Upload File</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="file" 
                          id="imageUpload" 
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-slate-100 border border-slate-300 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-200 transition-colors text-sm font-medium"
                        >
                          {uploadedImage ? 'Change Image' : 'Select File'}
                        </button>
                        {uploadedImage && (
                          <button 
                            type="button"
                            onClick={clearUpload}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove Upload
                          </button>
                        )}
                      </div>
                      {uploadedImage && <p className="text-xs text-brand-gold mt-2 font-medium">✓ Local file selected (prioritized)</p>}
                    </div>
                  </div>

                  <div className="w-full md:w-48 h-32 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center overflow-hidden bg-slate-50">
                    {previewSource ? (
                      <img src={previewSource} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-400 text-xs text-center p-2">Image Preview</span>
                    )}
                  </div>
                </div>
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
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button type="button" onClick={onCancel} className="bg-slate-200 text-slate-800 px-6 py-2 rounded-md hover:bg-slate-300 font-medium transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-brand-gold text-white px-8 py-2 rounded-md hover:bg-opacity-90 font-bold transition-all shadow-md">
            Save Property
          </button>
        </div>
      </form>
      <style>{`.input-style { border: 1px solid #cbd5e1; border-radius: 0.375rem; padding: 0.5rem 0.75rem; transition: all 0.2s; } .input-style:focus { outline: none; box-shadow: 0 0 0 2px #D4AF3744; border-color: #D4AF37; }`}</style>
    </div>
  );
};

export default AdminPropertyForm;
