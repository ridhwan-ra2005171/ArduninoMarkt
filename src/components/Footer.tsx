import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CircuitNest</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop shop for Arduino kits, parts, and project ideas.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kits" className="text-gray-300 hover:text-white transition-colors">
                  Starter Kits
                </Link>
              </li>
              <li>
                <Link to="/parts" className="text-gray-300 hover:text-white transition-colors">
                  Individual Parts
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
                  Project Ideas
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-300 mb-2 flex items-center">
              <Mail size={16} className="mr-2" />
              <a href="mailto:ridhwanathaullah18@gmail.com" className="hover:text-white transition-colors">
                ridhwanathaullah18@gmail.com
              </a>
            </p>
            <p className="text-gray-300">
              123 Maker Street<br />
              Tech City, TC 12345
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CircuitNest. RidhwanAthaullah All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;