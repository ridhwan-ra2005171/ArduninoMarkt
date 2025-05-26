import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Start Your Arduino Journey Today
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Everything you need to build amazing electronic projects.
              From starter kits to individual components, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/kits"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1"
              >
                Explore Starter Kits
              </Link>
              <Link
                to="/projects"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 md:opacity-40">
          {/* This would be a circuit board pattern or Arduino-themed graphic */}
          <div className="bg-white/10 w-full h-full"></div>
        </div>
      </section>

      {/* Featured Kits */}
      <section>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Kits</h2>
            <Link 
              to="/kits" 
              className="text-[#00979D] font-medium hover:underline flex items-center"
            >
              View all kits
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* These would be populated from your API/database */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/2435963/pexels-photo-2435963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Arduino Starter Kit" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Arduino Starter Kit</h3>
                <p className="text-gray-600 mb-4">Everything you need to get started with Arduino.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">$49.99</span>
                  <Link 
                    to="/kits/starter-kit" 
                    className="bg-[#00979D] text-white px-4 py-2 rounded hover:bg-[#007A7A] transition-colors"
                  >
                    View Kit
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/1432675/pexels-photo-1432675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="IoT Home Kit" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">IoT Home Kit</h3>
                <p className="text-gray-600 mb-4">Build smart home devices with Arduino and WiFi.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">$69.99</span>
                  <Link 
                    to="/kits/iot-home-kit" 
                    className="bg-[#00979D] text-white px-4 py-2 rounded hover:bg-[#007A7A] transition-colors"
                  >
                    View Kit
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Robotics Kit" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Robotics Kit</h3>
                <p className="text-gray-600 mb-4">Create your own robots with Arduino controllers.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">$89.99</span>
                  <Link 
                    to="/kits/robotics-kit" 
                    className="bg-[#00979D] text-white px-4 py-2 rounded hover:bg-[#007A7A] transition-colors"
                  >
                    View Kit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="bg-gray-50 py-16 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Latest Projects</h2>
            <Link 
              to="/projects" 
              className="text-[#00979D] font-medium hover:underline flex items-center"
            >
              All projects
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
              <img 
                src="https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="LED Light Show" 
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">LED Light Show</h3>
                <p className="text-gray-600 mb-4">
                  Create an amazing light display synchronized to music using Arduino and LEDs.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Beginner</span>
                  <span>Estimated time: 2 hours</span>
                </div>
                <Link 
                  to="/projects/led-light-show" 
                  className="text-[#00979D] font-medium hover:underline inline-flex items-center"
                >
                  Learn more
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
              <img 
                src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Smart Thermostat" 
                className="w-full md:w-1/3 h-48 md:h-auto object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Smart Thermostat</h3>
                <p className="text-gray-600 mb-4">
                  Build your own WiFi-connected thermostat to control your home temperature.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2">Intermediate</span>
                  <span>Estimated time: 4 hours</span>
                </div>
                <Link 
                  to="/projects/smart-thermostat" 
                  className="text-[#00979D] font-medium hover:underline inline-flex items-center"
                >
                  Learn more
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Arduino Shop</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Quality Components</h3>
              <p className="text-gray-600">
                We source only the highest quality Arduino components and parts for our kits.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Beginner Friendly</h3>
              <p className="text-gray-600">
                Detailed guides and project tutorials make Arduino accessible for everyone.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Shipping</h3>
              <p className="text-gray-600">
                Get your Arduino kits and components quickly with our expedited shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#00979D] text-white rounded-xl py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for the latest Arduino projects, tutorials, and exclusive deals.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-800 px-6 py-3 rounded-r-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;