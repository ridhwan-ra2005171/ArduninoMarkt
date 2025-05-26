import React from 'react';
import { useParams } from 'react-router-dom';

const PartDetailPage = () => {
  const { partId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Part Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Loading part details for ID: {partId}...</p>
      </div>
    </div>
  );
};

export default PartDetailPage;