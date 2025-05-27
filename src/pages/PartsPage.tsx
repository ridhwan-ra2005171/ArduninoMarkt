import React, { useState, useEffect } from 'react';
import PartCard from '../components/PartCard';
import { supabase } from '../lib/supabase';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    const fetchParts = async () => {
      try {
        // In a real app, this would fetch from Supabase
        const {data, error} = await supabase.from('components').select('*');

        if (error) {
          console.error('Error fetching parts:', error);
          setError('Failed to load parts. Please try again later.');
          setLoading(false);
          return;
        }

        const mockParts: Part[] = data.map((part: any) => ({
          id: part.id,
          name: part.name,
          description: part.description,
          price: part.price,
          image_url: part.image_url,
          category: part.category
        }));

        setParts(mockParts);//will be used to display the parts
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
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
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

        {/* Sort dropdown */}
        <div className="relative md:w-40">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <ArrowUpDown size={16} className="text-gray-400" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-9 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00979D] appearance-none bg-white text-sm"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low-High</option>
            <option value="price-high">Price: High-Low</option>
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