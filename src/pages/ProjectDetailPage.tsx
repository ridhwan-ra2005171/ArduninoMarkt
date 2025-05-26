import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetailPage = () => {
  const { projectId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Project details will be implemented later */}
        <p className="text-gray-600">Project ID: {projectId}</p>
        <p className="text-gray-600">Project details coming soon</p>
      </div>
    </div>
  );
};

export default ProjectDetailPage;