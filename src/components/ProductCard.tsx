import React from 'react';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const ProductCard: React.FC<ProductProps> = ({
  _id,
  name,
  description,
  price,
  image,
  category,
  rating
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id,
      name,
      price,
      image
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 bg-pink-600 text-white px-2 py-1 text-xs uppercase">
          {category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
            <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-pink-600 font-bold">₹{price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;