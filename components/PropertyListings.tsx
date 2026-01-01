
import React, { useState, useEffect } from 'react';
import { Property, ListingCategory } from '../types.ts';
import PropertyCard from './PropertyCard.tsx';
import Spinner from './Spinner.tsx';

interface PropertyListingsProps {
  properties: Property[];
  onSelectProperty: (id: number) => void;
}

const PropertyListings: React.FC<PropertyListingsProps> = ({ properties, onSelectProperty }) => {
  const [activeCategory, setActiveCategory] = useState<ListingCategory | 'All'>('All');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        const storedFavorites = localStorage.getItem('favoriteProperties');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  const toggleFavorite = (id: number) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const filteredProperties = activeCategory === 'All' 
    ? properties 
    : properties.filter(p => p.category === activeCategory);
    
  const categories: (ListingCategory | 'All')[] = ['All', ListingCategory.House, ListingCategory.Apartment, ListingCategory.Land];

  return (
    <section id="properties" className="py-16 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-brand-blue">Featured Properties</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Discover a curated selection of our finest properties available for you.</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 md:space-x-4 bg-white p-2 rounded-full shadow-md">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold transition-colors ${
                  activeCategory === category
                    ? 'bg-brand-blue text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyListings;
