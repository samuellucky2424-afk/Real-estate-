
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import PropertyListings from './components/PropertyListings.tsx';
import WhyChooseUs from './components/WhyChooseUs.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import PropertyDetail from './components/PropertyDetail.tsx';
import AdminLogin from './components/admin/AdminLogin.tsx';
import AdminDashboard from './components/admin/AdminDashboard.tsx';
import { propertiesData as initialProperties } from './data/properties.ts';
import { Property } from './types.ts';
import Spinner from './components/Spinner.tsx';

type View = 'loading' | 'main' | 'login' | 'admin';

const App: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [currentView, setCurrentView] = useState<View>('loading');

  useEffect(() => {
    const determineView = () => {
      const hash = window.location.hash;
      const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

      if (hash.startsWith('#/admin')) {
        setCurrentView(isAdmin ? 'admin' : 'login');
      } else {
        setCurrentView('main');
      }
    };

    // Immediate execution to set state before first render completes if possible
    determineView();

    window.addEventListener('hashchange', determineView);
    return () => {
      window.removeEventListener('hashchange', determineView);
    };
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('isAdmin', 'true');
    setCurrentView('admin');
    window.location.hash = '#/admin';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    window.location.hash = '#/';
  };

  const handleAddProperty = (property: Omit<Property, 'id'>) => {
    setProperties(prev => [
      { ...property, id: Date.now() },
      ...prev,
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
    window.scrollTo(0, 0);
  };

  const handleClearSelection = () => {
    setSelectedPropertyId(null);
  };

  const selectedProperty = selectedPropertyId ? properties.find(p => p.id === selectedPropertyId) : null;

  switch (currentView) {
    case 'loading':
      return <div className="min-h-screen flex items-center justify-center bg-brand-light"><Spinner /></div>;
    
    case 'login':
      return <AdminLogin onLogin={handleLogin} />;
      
    case 'admin':
      return (
        <AdminDashboard 
          properties={properties}
          onAddProperty={handleAddProperty}
          onUpdateProperty={handleUpdateProperty}
          onDeleteProperty={handleDeleteProperty}
          onLogout={handleLogout}
        />
      );

    case 'main':
    default:
      return (
        <div className="bg-brand-light font-sans text-slate-800">
          <Header />
          <main>
            {selectedProperty ? (
              <PropertyDetail property={selectedProperty} onBack={handleClearSelection} />
            ) : (
              <>
                <Hero />
                <PropertyListings 
                  properties={properties} 
                  onSelectProperty={handleSelectProperty}
                />
                <WhyChooseUs />
                <About />
                <Contact />
              </>
            )}
          </main>
          <Footer />
        </div>
      );
  }
};

export default App;