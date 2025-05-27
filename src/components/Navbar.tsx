import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const { cartItems, getTotalQuantity } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-[#00979D]">CircuitNest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/kits" className="text-gray-700 hover:text-[#00979D] transition-colors">
              Kits
            </Link>
            <Link to="/parts" className="text-gray-700 hover:text-[#00979D] transition-colors">
              Parts
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-[#00979D] transition-colors">
              Projects
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-[#00979D] relative">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00979D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalQuantity()} 
                </span>
                //used this because cartItems.length only takes unique
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-[#00979D]">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-[#00979D]">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/kits" 
                className="text-gray-700 hover:text-[#00979D]"
                onClick={() => setIsMenuOpen(false)}
              >
                Kits
              </Link>
              <Link 
                to="/parts" 
                className="text-gray-700 hover:text-[#00979D]"
                onClick={() => setIsMenuOpen(false)}
              >
                Parts
              </Link>
              <Link 
                to="/projects" 
                className="text-gray-700 hover:text-[#00979D]"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-[#00979D] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} className="mr-2" />
                Cart {cartItems.length > 0 && `(${getTotalQuantity()})`}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;