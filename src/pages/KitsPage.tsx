import React, { useState, useEffect } from 'react';
import KitCard from '../components/KitCard';
import { supabase } from '../lib/supabase';
import { Search, Filter } from 'lucide-react';

interface Kit {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  difficulty: string;
  tags: string[];
}

const KitsPage: React.FC = () => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchKits = async () => {
      try {
        // In a real app, this would fetch from Supabase
        // const { data, error } = await supabase.from('kits').select('*');
        
        // For now, we'll use mock data
        const mockKits: Kit[] = [
          {
            id: 'starter-kit',
            name: 'Arduino Starter Kit',
            description: 'Everything you need to get started with Arduino. Includes Arduino Uno, breadboard, jumper wires, LEDs, resistors, and more.',
            price: 49.99,
            image_url: 'https://images.pexels.com/photos/2435963/pexels-photo-2435963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            difficulty: 'Beginner',
            tags: ['beginner', 'starter', 'complete']
          },
          {
            id: 'iot-home-kit',
            name: 'IoT Home Kit',
            description: 'Build smart home devices with Arduino and WiFi. Includes Arduino with WiFi, sensors, relay modules, and project guide.',
            price: 69.99,
            image_url: 'https://images.pexels.com/photos/1432675/pexels-photo-1432675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            difficulty: 'Intermediate',
            tags: ['iot', 'wifi', 'smart-home']
          },
          {
            id: 'robotics-kit',
            name: 'Robotics Kit',
            description: 'Create your own robots with Arduino controllers. Includes motors, chassis, sensors, and complete build instructions.',
            price: 89.99,
            image_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            difficulty: 'Advanced',
            tags: ['robotics', 'motors', 'advanced']
          },
          {
            id: 'wearable-kit',
            name: 'Wearable Tech Kit',
            description: 'Includes LilyPad, flexible sensors, and more to get started with e-textiles and wearable electronics.',
            price: 45.00,
            image_url: 'https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            difficulty: 'Beginner',
            tags: ['wearable', 'e-textiles', 'lilypad']
          },
          {
            id: 'music-kit',
            name: 'Music & Sound Kit',
            description: 'Create musical instruments and sound projects with Arduino. Includes speakers, buttons, and sensors.',
            price: 39.99,
            image_url: 'https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            difficulty: 'Intermediate',
            tags: ['music', 'sound', 'audio']
          },
          {
            id: 'advanced-sensors-kit',
            name: 'Advanced Sensors Kit',
            description: 'Explore various environmental and physical sensors with this comprehensive kit for Arduino projects.',
            price: 79.99,
            image_url: 'https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            difficulty: 'Advanced',
            tags: ['sensors', 'environment', 'data']
          }
        ];
        
        setKits(mockKits);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching kits:', err);
        setError('Failed to load kits. Please try again later.');
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  const filteredKits = kits.filter(kit => {
    const matchesSearch = kit.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         kit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kit.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter ? kit.difficulty.toLowerCase() === difficultyFilter.toLowerCase() : true;
    
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Arduino Starter Kits</h1>
        <p className="text-gray-600">
          Browse our collection of Arduino starter kits for all skill levels.
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
            placeholder="Search kits..."
            className="pl-10 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00979D]"
          />
        </div>
        
        <div className="md:w-1/4">
          <select
            value={difficultyFilter || ''}
            onChange={(e) => setDifficultyFilter(e.target.value || null)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00979D] appearance-none bg-white"
          >
            <option value="">All Difficulty Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
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
          {filteredKits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No kits found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter(null);
                }}
                className="mt-4 text-[#00979D] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredKits.map((kit) => (
                <KitCard
                  key={kit.id}
                  id={kit.id}
                  name={kit.name}
                  description={kit.description}
                  price={kit.price}
                  image={kit.image_url}
                  difficulty={kit.difficulty}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KitsPage;