import React, { useState, useEffect } from 'react';
import PartCard from '../components/PartCard';
import { supabase } from '../lib/supabase';
import { Search, Filter } from 'lucide-react';

interface Part {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

const PartsPage: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        // In a real app, this would fetch from Supabase
        // const { data, error } = await supabase.from('parts').select('*');
        
        // For now, we'll use mock data
        const mockParts: Part[] = [
          {
            id: 'arduino-uno',
            name: 'Arduino Uno Rev3',
            description: 'The Arduino Uno is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.',
            price: 23.00,
            image_url: 'https://images.pexels.com/photos/2086611/pexels-photo-2086611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Boards'
          },
          {
            id: 'ultrasonic-sensor',
            name: 'HC-SR04 Ultrasonic Sensor',
            description: 'The HC-SR04 ultrasonic sensor uses sonar to determine distance to an object like bats do. It offers excellent non-contact range detection with high accuracy and stable readings.',
            price: 3.95,
            image_url: 'https://images.pexels.com/photos/8294608/pexels-photo-8294608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Sensors'
          },
          {
            id: 'servo-motor',
            name: 'Micro Servo Motor SG90',
            description: 'Tiny and lightweight servo motor with high output power. Can rotate approximately 180 degrees (90 in each direction), and works just like standard servo motors but smaller.',
            price: 4.50,
            image_url: 'https://images.pexels.com/photos/4219653/pexels-photo-4219653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Components'
          },
          {
            id: 'lcd-display',
            name: '16x2 LCD Display',
            description: 'This is a basic 16 character by 2 line display. Blue and white backlight with black text. Uses the HD44780 controller.',
            price: 9.95,
            image_url: 'https://images.pexels.com/photos/13812355/pexels-photo-13812355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Displays'
          },
          {
            id: 'esp8266-wifi',
            name: 'ESP8266 WiFi Module',
            description: 'The ESP8266 WiFi Module is a self-contained SOC with integrated TCP/IP protocol stack that can give any microcontroller access to your WiFi network.',
            price: 6.95,
            image_url: 'https://images.pexels.com/photos/3512894/pexels-photo-3512894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Modules'
          },
          {
            id: 'temperature-sensor',
            name: 'DS18B20 Temperature Sensor',
            description: 'Digital temperature sensor providing 9-bit to 12-bit Celsius temperature measurements. Communicates over a 1-Wire bus that requires only one data line for communication.',
            price: 3.50,
            image_url: 'https://images.pexels.com/photos/5730956/pexels-photo-5730956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Sensors'
          },
          {
            id: 'relay-module',
            name: '5V Relay Module',
            description: 'This 5V Relay Module is a convenient board which can be used to control high voltage, high current loads such as motors, solenoids, lamps, AC loads.',
            price: 2.99,
            image_url: 'https://images.pexels.com/photos/3616765/pexels-photo-3616765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Modules'
          },
          {
            id: 'bluetooth-module',
            name: 'HC-05 Bluetooth Module',
            description: 'HC-05 module is an easy to use Bluetooth SPP (Serial Port Protocol) module, designed for transparent wireless serial connection setup.',
            price: 8.50,
            image_url: 'https://images.pexels.com/photos/3491192/pexels-photo-3491192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Modules'
          }
        ];
        
        setParts(mockParts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching parts:', err);
        setError('Failed to load parts. Please try again later.');
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         part.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? part.category.toLowerCase() === categoryFilter.toLowerCase() : true;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(parts.map(part => part.category))];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Arduino Components</h1>
        <p className="text-gray-600">
          Browse our collection of individual Arduino components and modules.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="pl-10 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00979D]"
          />
        </div>
        
        <div className="md:w-1/4">
          <select
            value={categoryFilter || ''}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00979D] appearance-none bg-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00979D]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          {filteredParts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No components found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter(null);
                }}
                className="mt-4 text-[#00979D] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredParts.map((part) => (
                <PartCard
                  key={part.id}
                  id={part.id}
                  name={part.name}
                  description={part.description}
                  price={part.price}
                  image={part.image_url}
                  category={part.category}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PartsPage;