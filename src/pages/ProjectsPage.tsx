import React from 'react';

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project list will be implemented later */}
        <p className="text-gray-600">No projects available yet</p>
      </div>
    </div>
  );
};

export default ProjectsPage;