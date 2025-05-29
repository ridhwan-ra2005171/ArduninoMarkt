import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

interface Kit {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  difficulty: string;
  tags: string[];
  included_components: string;
}

const KitDetailPage = () => {
  const { kitId } = useParams();
  const navigate = useNavigate();
  const [kit, setKit] = useState<Kit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKitDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', kitId)
          .single();

        if (error) {
          setError('Failed to load kit details. Please try again later.');
          console.error('Error fetching kit:', error);
        } else if (data) {
          setKit(data);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKitDetails();
  }, [kitId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00979D]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!kit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg">
          Kit not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-[#00979D] mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Kits</span>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            <img
              src={kit.image_url}
              alt={kit.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4">
              <span className={`
                px-4 py-2 rounded-full text-sm font-semibold
                ${kit.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  kit.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}
              `}>
                {kit.difficulty}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{kit.name}</h1>
              <p className="text-3xl font-bold text-[#00979D] mb-6">
                ${kit.price.toFixed(2)}
              </p>
              <p className="text-gray-600 text-lg mb-6">
                {kit.description}
              </p>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {kit.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {kit.included_components && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">What's Included:</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {kit.included_components.split('\n').map((component, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#00979D]" />
                          <span className="ml-3 text-gray-700">{component}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <button className="w-full bg-[#00979D] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#007A7A] transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitDetailPage;