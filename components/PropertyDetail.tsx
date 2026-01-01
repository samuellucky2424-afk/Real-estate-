
import React, { useState } from 'react';
import { Property, ListingCategory } from '../types.ts';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack }) => {
  const [mainImage, setMainImage] = useState(property.image);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onBack(); // Go back to the main page first
    setTimeout(() => { // Then scroll to contact section
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  return (
    <section className="py-12 md:py-16 bg-white animate-fade-in">
      <div className="container mx-auto px-4">
        <button onClick={onBack} className="mb-8 text-brand-blue font-semibold hover:underline">
          &larr; Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-serif font-bold text-brand-blue mb-2">{property.name}</h1>
            <p className="text-lg text-slate-500 mb-6">{property.location}</p>
            
            <div className="mb-6">
              <img src={mainImage} alt={property.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
            </div>

            {property.gallery && property.gallery.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {property.gallery.map((img, index) => (
                  <button key={index} onClick={() => setMainImage(img)}>
                    <img 
                      src={img} 
                      alt={`View ${index + 1}`} 
                      className={`h-20 w-28 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === img ? 'border-brand-gold' : 'border-transparent'}`} 
                    />
                  </button>
                ))}
              </div>
            )}
            
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-brand-blue mb-4 border-b pb-2">Description</h2>
                <p className="text-slate-700 leading-relaxed">{property.description}</p>
            </div>
            
            {property.amenities && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-brand-blue mb-4 border-b pb-2">Amenities</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map(amenity => <li key={amenity} className="text-slate-700">✓ {amenity}</li>)}
                </ul>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 bg-brand-light p-8 rounded-lg shadow-md">
              <p className="text-4xl font-bold text-brand-blue mb-6">{property.price}</p>
              
              {property.category !== ListingCategory.Land && (
                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <p className="font-bold text-xl">{property.bedrooms ?? 'N/A'}</p>
                    <p className="text-sm text-slate-500">Beds</p>
                  </div>
                  <div>
                    <p className="font-bold text-xl">{property.bathrooms ?? 'N/A'}</p>
                    <p className="text-sm text-slate-500">Baths</p>
                  </div>
                  <div>
                    <p className="font-bold text-xl">{property.sqft ?? 'N/A'}</p>
                    <p className="text-sm text-slate-500">sqm</p>
                  </div>
                </div>
              )}
               {property.category === ListingCategory.Land && (
                 <div className="grid grid-cols-1 gap-4 text-center mb-6">
                  <div>
                    <p className="font-bold text-xl">{property.sqft ?? 'N/A'}</p>
                    <p className="text-sm text-slate-500">sqm</p>
                  </div>
                </div>
               )}

              <a href="#contact" onClick={scrollToContact} className="w-full block text-center bg-brand-gold text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                Inquire About This Property
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetail;
