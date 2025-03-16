import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call to your backend
        // const response = await axios.get('http://localhost:5000/api/products');
        // setProducts(response.data);
        
        // For demo purposes, we'll use mock data
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term and category
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for items..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found. Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              category={product.category}
              rating={product.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Chocolate Truffle Cake',
    description: 'Rich chocolate cake with smooth truffle frosting, perfect for celebrations.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Cakes',
    rating: 4.8
  },
  {
    _id: '2',
    name: 'Red Velvet Cake',
    description: 'Classic red velvet cake with cream cheese frosting.',
    price: 649,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324626f14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Cakes',
    rating: 4.7
  },
  {
    _id: '3',
    name: 'Blueberry Cheesecake',
    description: 'Creamy cheesecake topped with fresh blueberry compote.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Cakes',
    rating: 4.9
  },
  {
    _id: '4',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pizza',
    rating: 4.5
  },
  {
    _id: '5',
    name: 'Pepperoni Pizza',
    description: 'Pizza topped with pepperoni slices and mozzarella cheese.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pizza',
    rating: 4.6
  },
  {
    _id: '6',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Burgers',
    rating: 4.4
  },
  {
    _id: '7',
    name: 'Chicken Burger',
    description: 'Grilled chicken patty with lettuce, mayo, and pickles.',
    price: 179,
    image: 'https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Burgers',
    rating: 4.3
  },
  {
    _id: '8',
    name: 'Paneer Roll',
    description: 'Soft roll filled with spicy paneer and fresh vegetables.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Rolls',
    rating: 4.5
  },
  {
    _id: '9',
    name: 'Chocolate Pastry',
    description: 'Decadent chocolate pastry with layers of chocolate ganache.',
    price: 99,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pastries',
    rating: 4.7
  },
  {
    _id: '10',
    name: 'Birthday Decoration Kit',
    description: 'Complete kit with balloons, banners, and party poppers.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Decorations',
    rating: 4.8
  },
  {
    _id: '11',
    name: 'Party Balloon Set',
    description: 'Set of 50 colorful balloons for birthday celebrations.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Decorations',
    rating: 4.6
  },
  {
    _id: '12',
    name: 'Birthday Candles Pack',
    description: 'Pack of decorative birthday candles in various colors.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Decorations',
    rating: 4.5
  }
];

export default Menu;