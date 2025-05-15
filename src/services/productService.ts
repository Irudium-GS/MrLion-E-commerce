import { Product, ProductFilter } from '../types';

// Mock product data
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Stainless Steel Cookware Set',
    description: 'A complete set of premium stainless steel cookware for all your cooking needs. Includes pots, pans, and utensils.',
    price: 12999,
    discountPercentage: 15,
    image: 'https://images.pexels.com/photos/6996054/pexels-photo-6996054.jpeg',
    category: 'cookware',
    rating: 4.7,
    ratingCount: 128,
    stock: 15,
    features: ['Stainless Steel', 'Dishwasher Safe', '10 Piece Set', 'Heat Resistant Handles'],
  },
  {
    id: '2',
    name: 'Digital Air Fryer',
    description: 'Cook healthier meals with this digital air fryer. Uses up to 80% less oil than traditional frying methods.',
    price: 9999,
    discountPercentage: 10,
    image: 'https://images.pexels.com/photos/5980901/pexels-photo-5980901.jpeg',
    category: 'appliances',
    rating: 4.5,
    ratingCount: 89,
    stock: 23,
    features: ['5L Capacity', 'Digital Touch Screen', '8 Preset Modes', 'Easy Clean'],
  },
  {
    id: '3',
    name: 'Ceramic Knife Set',
    description: 'Ultra-sharp ceramic knife set that stays sharper longer than traditional steel knives.',
    price: 5499,
    discountPercentage: 0,
    image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg',
    category: 'kitchen-essentials',
    rating: 4.3,
    ratingCount: 65,
    stock: 42,
    features: ['5 Piece Set', 'Ergonomic Handle', 'Ultra Sharp', 'Includes Knife Block'],
  },
  {
    id: '4',
    name: 'Smart Coffee Maker',
    description: 'Programmable coffee maker with smartphone connectivity. Schedule your perfect cup of coffee.',
    price: 8499,
    discountPercentage: 5,
    image: 'https://images.pexels.com/photos/6400024/pexels-photo-6400024.jpeg',
    category: 'appliances',
    rating: 4.8,
    ratingCount: 73,
    stock: 18,
    features: ['12 Cup Capacity', 'WiFi Enabled', 'App Control', 'Multiple Brew Strengths'],
  },
  {
    id: '5',
    name: 'Premium Wooden Cutting Board',
    description: 'Handcrafted wooden cutting board made from sustainable acacia wood. Durable and knife-friendly.',
    price: 2999,
    discountPercentage: 0,
    image: 'https://images.pexels.com/photos/5303602/pexels-photo-5303602.jpeg',
    category: 'kitchen-essentials',
    rating: 4.6,
    ratingCount: 41,
    stock: 56,
    features: ['Acacia Wood', 'Juice Groove', 'Reversible', 'Handwash Only'],
  },
  {
    id: '6',
    name: 'Electric Stand Mixer',
    description: 'Powerful stand mixer perfect for baking enthusiasts. Includes multiple attachments for various tasks.',
    price: 18999,
    discountPercentage: 20,
    image: 'https://images.pexels.com/photos/6640899/pexels-photo-6640899.jpeg',
    category: 'appliances',
    rating: 4.9,
    ratingCount: 112,
    stock: 10,
    features: ['5L Bowl', '10 Speed Settings', '3 Attachments Included', 'Planetary Mixing Action'],
  },
  {
    id: '7',
    name: 'Copper Bottom Saucepan',
    description: 'Classic saucepan with copper bottom for even heat distribution and precise cooking control.',
    price: 3499,
    discountPercentage: 0,
    image: 'https://images.pexels.com/photos/6996126/pexels-photo-6996126.jpeg',
    category: 'cookware',
    rating: 4.4,
    ratingCount: 57,
    stock: 35,
    features: ['2L Capacity', 'Copper Bottom', 'Stainless Steel Body', 'Stay-Cool Handle'],
  },
  {
    id: '8',
    name: 'Glass Storage Container Set',
    description: 'Leak-proof glass food storage containers with snap-lock lids. Perfect for meal prep and leftovers.',
    price: 2499,
    discountPercentage: 5,
    image: 'https://images.pexels.com/photos/6488935/pexels-photo-6488935.jpeg',
    category: 'kitchen-essentials',
    rating: 4.2,
    ratingCount: 38,
    stock: 62,
    features: ['10 Piece Set', 'BPA-Free', 'Microwave Safe', 'Dishwasher Safe'],
  },
  {
    id: '9',
    name: 'Professional Blender',
    description: 'High-powered blender that effortlessly crushes ice, pulverizes fruits, and blends smooth drinks.',
    price: 11999,
    discountPercentage: 10,
    image: 'https://images.pexels.com/photos/8505686/pexels-photo-8505686.jpeg',
    category: 'appliances',
    rating: 4.7,
    ratingCount: 95,
    stock: 14,
    features: ['1500W Motor', '2L Jar', 'Variable Speed', 'Pulse Function'],
  },
  {
    id: '10',
    name: 'Cast Iron Skillet',
    description: 'Pre-seasoned cast iron skillet perfect for searing, baking, broiling, and frying.',
    price: 3999,
    discountPercentage: 0,
    image: 'https://images.pexels.com/photos/262905/pexels-photo-262905.jpeg',
    category: 'cookware',
    rating: 4.8,
    ratingCount: 109,
    stock: 27,
    features: ['12 Inch Diameter', 'Pre-Seasoned', 'Oven Safe', 'Helper Handle'],
  },
  {
    id: '11',
    name: 'Espresso Machine',
    description: 'Compact espresso machine for café-quality coffee at home. Features a powerful milk frother.',
    price: 15999,
    discountPercentage: 15,
    image: 'https://images.pexels.com/photos/6320010/pexels-photo-6320010.jpeg',
    category: 'appliances',
    rating: 4.6,
    ratingCount: 84,
    stock: 9,
    features: ['15 Bar Pressure', 'Milk Frother', 'Compact Design', 'Easy Clean'],
  },
  {
    id: '12',
    name: 'Silicone Utensil Set',
    description: 'Heat-resistant silicone utensil set that won\'t scratch your cookware. Includes all essential tools.',
    price: 1999,
    discountPercentage: 0,
    image: 'https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg',
    category: 'kitchen-essentials',
    rating: 4.3,
    ratingCount: 47,
    stock: 83,
    features: ['6 Piece Set', 'Heat Resistant to 230°C', 'Non-Stick Safe', 'Dishwasher Safe'],
  },
];

// Get all products with optional filtering
export const getProducts = async (filters?: ProductFilter): Promise<Product[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredProducts = [...MOCK_PRODUCTS];
  
  if (filters) {
    // Filter by category
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === filters.category
      );
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by price range
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filters.minPrice!
      );
    }
    
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= filters.maxPrice!
      );
    }
    
    // Filter by rating
    if (filters.minRating !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= filters.minRating!
      );
    }
    
    // Limit results
    if (filters.limit) {
      filteredProducts = filteredProducts.slice(0, filters.limit);
    }
  }
  
  return filteredProducts;
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  return product || null;
};

// Get featured products
export const getFeaturedProducts = async (category?: string): Promise<Product[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredProducts = [...MOCK_PRODUCTS];
  
  // Filter by featured category if provided
  if (category) {
    switch (category) {
      case 'best-sellers':
        // Sort by highest rating and limit to 8
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'new-arrivals':
        // In a real app, we'd sort by date - here we'll just shuffle
        filteredProducts.sort(() => Math.random() - 0.5);
        break;
      case 'deals':
        // Filter by discount
        filteredProducts = filteredProducts.filter(p => p.discountPercentage > 0);
        // Sort by highest discount
        filteredProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
    }
  }
  
  // Limit to 8 products
  return filteredProducts.slice(0, 8);
};

// Get all product categories
export const getCategories = async (): Promise<string[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Extract unique categories from products
  const categories = [...new Set(MOCK_PRODUCTS.map(product => product.category))];
  return categories;
};