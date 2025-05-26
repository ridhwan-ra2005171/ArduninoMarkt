import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface KitCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  difficulty: string;
}

const KitCard: React.FC<KitCardProps> = ({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  difficulty 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      type: 'kit'
    });
  };

  const getDifficultyColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/kits/${id}`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
        <Link to={`/kits/${id}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-[#00979D] transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">${price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <Link 
              to={`/kits/${id}`} 
              className="text-[#00979D] border border-[#00979D] px-3 py-1 rounded hover:bg-[#00979D] hover:text-white transition-colors"
            >
              Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-[#00979D] text-white px-3 py-1 rounded hover:bg-[#007A7A] transition-colors flex items-center"
            >
              <ShoppingCart size={16} className="mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitCard;