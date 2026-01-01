
import { Property, ListingCategory } from '../types.ts';

export const propertiesData: Property[] = [
  { 
    id: 1, 
    category: ListingCategory.House, 
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&h=600&auto=format&fit=crop', 
    price: '₦450,000,000', 
    name: 'Modern Villa with Ocean View', 
    location: 'Lekki Phase 1, Lagos', 
    description: 'A stunning 5-bedroom fully detached villa with panoramic ocean views, a private infinity pool, a home cinema, and state-of-the-art security systems. Perfect for luxury living and entertaining.',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 800,
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613976974826-3a55c6481268?q=80&w=800&h=600&auto=format&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Ocean View', '24/7 Security', 'Home Cinema', 'Fully Fitted Kitchen']
  },
  { 
    id: 2, 
    category: ListingCategory.Apartment, 
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&h=600&auto=format&fit=crop', 
    price: '₦250,000,000', 
    name: 'Luxury Penthouse Apartment', 
    location: 'Eko Atlantic, Lagos', 
    description: 'Experience city living at its finest in this 3-bedroom penthouse with floor-to-ceiling windows offering spectacular views of the city and the Atlantic. Comes with access to a rooftop lounge and gym.',
    bedrooms: 3,
    bathrooms: 4,
    sqft: 450,
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&h=600&auto=format&fit=crop'
    ],
    amenities: ['City View', 'Gym Access', '24/7 Power', 'Concierge Service', 'Underground Parking']
  },
  { 
    id: 3, 
    category: ListingCategory.Land, 
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&h=600&auto=format&fit=crop', 
    price: '₦55,000,000', 
    name: 'Prime Plot of Land', 
    location: 'Ibeju-Lekki, Lagos', 
    description: 'Build your dream home or a lucrative investment on this 600sqm plot of land in a rapidly developing area. The plot is dry, fenced, and comes with a verifiable Certificate of Occupancy (C of O).',
    sqft: 600,
    amenities: ['Gated Estate', 'Good Road Network', 'Perimeter Fencing', 'C of O Title']
  },
  { 
    id: 4, 
    category: ListingCategory.House, 
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&h=600&auto=format&fit=crop', 
    price: '₦120,000,000', 
    name: 'Charming Family Duplex', 
    location: 'Ikeja GRA, Lagos', 
    description: 'A beautiful 4-bedroom semi-detached duplex in a serene, family-friendly neighborhood. Features a spacious living room, a modern kitchen, and a private backyard perfect for family gatherings.',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 550,
    gallery: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605276374104-5de67d609b8e?q=80&w=800&h=600&auto=format&fit=crop'
    ],
    amenities: ['Private Compound', 'Boys Quarters', 'Ample Parking', 'Gated Community']
  },
  { 
    id: 5, 
    category: ListingCategory.Apartment, 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&h=600&auto=format&fit=crop', 
    price: '₦180,000,000', 
    name: 'Modern Serviced Apartment', 
    location: 'Ikoyi, Lagos', 
    description: 'A stylish 2-bedroom serviced apartment in the heart of Ikoyi. This property offers modern amenities, 24/7 power, and excellent facility management, making it ideal for professionals and expatriates.',
    bedrooms: 2,
    bathrooms: 3,
    sqft: 300,
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494203484021-3c454daf695d?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585152225-3579fe9d7ae9?q=80&w=800&h=600&auto=format&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Gym', '24/7 Power', 'Elevator', 'Security']
  },
  { 
    id: 6, 
    category: ListingCategory.House, 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&auto=format&fit=crop', 
    price: '₦850,000,000', 
    name: 'Contemporary Architectural Marvel', 
    location: 'Banana Island, Lagos', 
    description: 'This architectural masterpiece features 6 ensuite bedrooms, a private cinema, a rooftop terrace with a jacuzzi, and smart home technology. The epitome of luxury in Nigeria\'s most exclusive neighborhood.',
    bedrooms: 6,
    bathrooms: 7,
    sqft: 1200,
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&h=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585153492-7a8f3c63a6e0?q=80&w=800&h=600&auto=format&fit=crop'
    ],
    amenities: ['Smart Home', 'Rooftop Terrace', 'Jacuzzi', 'Private Cinema', 'Waterfront View']
  },
];
