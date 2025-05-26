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
        // Change 'kits' to 'products'
        const { data, error } = await supabase.from('products').select('*');

        if (error) {
          console.error('Error fetching kits:', error);
          setError('Failed to load kits. Please try again later.');
          setLoading(false);
          return;
        }

        const mockKits: Kit[] = data.map((kit: any) => ({
          id: kit.id,
          name: kit.name,
          description: kit.description,
          price: kit.price,
          image_url: kit.image_url,
          difficulty: kit.difficulty,
          tags: kit.tags
        }));

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