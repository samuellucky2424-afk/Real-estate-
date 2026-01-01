
import React from 'react';
import { Property } from '../types.ts';
import { HeartIcon, SolidHeartIcon } from './icons.tsx';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelectProperty: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isFavorite, onToggleFavorite, onSelectProperty }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };
  
  const handleCardClick = () => {
    onSelectProperty(property.id);
  }

  return (
    <div onClick={handleCardClick} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer">
      <div className="relative overflow-hidden">
        <img src={property.image} alt={property.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-4 left-4 bg-brand-blue text-white text-sm font-semibold px-3 py-1 rounded-full">{property.category}</div>
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-white transition-colors z-10"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <SolidHeartIcon className="h-6 w-6" />
          ) : (
            <HeartIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="p-6">
        <p className="text-2xl font-bold text-brand-blue mb-2">{property.price}</p>
        <h3 className="text-xl font-semibold text-slate-800 mb-1 truncate">{property.name}</h3>
        <p className="text-slate-500 mb-4 truncate">{property.location}</p>
        <p className="text-slate-600 text-sm h-10 overflow-hidden">{property.description}</p>
        <div className="mt-6">
          <span className="text-brand-gold font-semibold group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
