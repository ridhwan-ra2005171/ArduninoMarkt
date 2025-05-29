import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PartCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const PartCard: React.FC<PartCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  category
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      type: 'part'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'boards':
        return 'bg-purple-100 text-purple-800';
      case 'sensors':
        return 'bg-blue-100 text-blue-800';
      case 'modules':
        return 'bg-green-100 text-green-800';
      case 'displays':
        return 'bg-yellow-100 text-yellow-800';
      case 'components':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col h-full">
        <Link to={`/parts/${id}`}>
          <div className="relative pt-[40%] w-[50%] mx-auto mt-4">
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-contain bg-white"
            />
          </div>
        </Link>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center mb-2">
            <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>
          <Link to={`/parts/${id}`}>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-gray-800 hover:text-[#00979D] transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          <p className="hidden sm:line-clamp-2 block text-gray-600 mb-4">{description}</p>
          <div className="mt-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <span className="text-base sm:text-lg md:text-xl font-bold text-gray-800 hover:text-[#00979D] transition-colors">${price.toFixed(2)}</span>
              <div className="flex space-x-2">
                <Link
                  to={`/parts/${id}`}
                  className="text-[#00979D] border border-[#00979D] px-3 py-1 rounded hover:bg-[#00979D] hover:text-white transition-colors flex-1 sm:flex-initial"
                >
                  Details
                </Link>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#00979D] text-white px-3 py-1 rounded hover:bg-[#007A7A] transition-colors flex items-center justify-center flex-1 sm:flex-initial"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartCard;