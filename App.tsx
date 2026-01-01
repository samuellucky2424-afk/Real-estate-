
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyListings from './components/PropertyListings';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PropertyDetail from './components/PropertyDetail';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { propertiesData as initialProperties } from './data/properties';
import { Property } from './types';

const App: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  
  // Routing and Auth State
  const [route, setRoute] = useState(window.location.hash);
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('isAdmin', 'true');
    setIsAdmin(true);
    window.location.hash = '#/admin';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAdmin(false);
    window.location.hash = '#/';
  };

  // Property CRUD Operations
  const handleAddProperty = (property: Omit<Property, 'id'>) => {
    setProperties(prev => [
      ...prev,
      { ...property, id: Date.now() } // Use timestamp for unique ID
    ]);
  };

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(prev => 
      prev.map(p => p.id === updatedProperty.id ? updatedProperty : p)
    );
  };

  const handleDeleteProperty = (id: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };


  const handleSelectProperty = (id: number) => {
    setSelectedPropertyId(id);
    window.scrollTo(0, 0); // Scroll to top when a property is selected
  };

  const handleClearSelection = () => {
    setSelectedPropertyId(null);
  };
  
  const selectedProperty = selectedPropertyId ? properties.find(p => p.id === selectedPropertyId) : null;

  // Render based on route
  if (route.startsWith('#/admin')) {
    if (!isAdmin) {
      return <AdminLogin onLogin={handleLogin} />;
    }
    return (
      <AdminDashboard 
        properties={properties}
        onAddProperty={handleAddProperty}
        onUpdateProperty={handleUpdateProperty}
        onDeleteProperty={handleDeleteProperty}
        onLogout={handleLogout}
      />
    );
  }
  
  // Render main site
  return (
    <div className="bg-brand-light font-sans text-slate-800">
      <Header />
      <main>
        {selectedProperty ? (
          <PropertyDetail property={selectedProperty} onBack={handleClearSelection} />
        ) : (
          <>
            <Hero />
            <PropertyListings properties={properties} onSelectProperty={handleSelectProperty} />
            <WhyChooseUs />
            <About />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
