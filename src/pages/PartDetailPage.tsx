import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ImageMagnifier from '../components/ImageMagnifier';

interface Part {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  brand: string;
  connectivity: string | null;
  included_components: string[] | null;
  wireless_standard: string | null;
  compatible_devices: string | null;
  features: string | null;
}

const PartDetailPage = () => {
  const { partId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('components')
          .select('*')
          .eq('id', partId)
          .single();

        if (error) {
          setError('Failed to load part details. Please try again later.');
          console.error('Error fetching part:', error);
        } else if (data) {
          setPart(data);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartDetails();
  }, [partId]);

  const handleAddToCart = () => {
    if (part) {
      addToCart({
        id: part.id,
        name: part.name,
        price: part.price,
        image: part.image_url,
        type: 'part'
      });
    }
  };

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

  if (!part) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg">
          Part not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-[#00979D] mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center">
          <ImageMagnifier
            src={part.image_url}
            alt={part.name}
            width="100%"
            height="24rem"
            magnifierHeight={250}
            magnifierWidth={250}
            zoomLevel={1}
          />
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              {part.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">{part.name}</h1>
            <p className="text-2xl font-bold text-[#00979D] mt-2">
              ${part.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{part.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Brand</h3>
                <p className="text-gray-600">{part.brand}</p>
              </div>
              {part.connectivity && (
                <div>
                  <h3 className="font-semibold text-gray-700">Connectivity</h3>
                  <p className="text-gray-600">{part.connectivity}</p>
                </div>
              )}
              {part.wireless_standard && (
                <div>
                  <h3 className="font-semibold text-gray-700">Wireless Standard</h3>
                  <p className="text-gray-600">{part.wireless_standard}</p>
                </div>
              )}
              {part.compatible_devices && (
                <div>
                  <h3 className="font-semibold text-gray-700">Compatible Devices</h3>
                  <p className="text-gray-600">{part.compatible_devices}</p>
                </div>
              )}
            </div>

            {part.features && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Features</h2>
                <p className="text-gray-600">{part.features}</p>
              </div>
            )}

            {part.included_components && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Included Components</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {typeof part.included_components === 'string' ? (
                    <li>{part.included_components}</li>
                  ) : Array.isArray(part.included_components) && part.included_components.length > 0 ? (
                    part.included_components.map((component, index) => (
                      <li key={index}>{component}</li>
                    ))
                  ) : null}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-[#00979D] text-white px-6 py-3 rounded-lg hover:bg-[#007A7A] transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartDetailPage;