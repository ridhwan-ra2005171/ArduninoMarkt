import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  projectid: string;
  name: string;
  description: string;
  difficulty: string;
  duration: string;
  detailed_description: string;
  image_url: string;
}

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('projectid', projectId)
          .single();

        if (error) {
          setError('Failed to fetch project details');
          setLoading(false);
          return;
        }

        setProject(data);
        setLoading(false);
      } catch (err) {
        setError('An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00979D]"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            {error || 'Project not found'}
          </h2>
          <p className="text-red-600 mb-4">
            We couldn't find the project you're looking for.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-[#00979D] hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-[#00979D] hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </Link>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative h-64 md:h-96">
          <img
            src={project.image_url}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            <p className="text-lg opacity-90 max-w-3xl">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Project Details</h2>
            <div className="prose max-w-none">
              {project.detailed_description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Project Information</h3>
            
            {/* Difficulty */}
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">Difficulty Level</div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                project.difficulty === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {project.difficulty}
              </span>
            </div>

            {/* Duration */}
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">Estimated Time</div>
              <div className="flex items-center text-gray-700">
                <Clock size={18} className="mr-2" />
                {project.duration}
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-[#00979D] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#007A7A] transition-colors">
              Start Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;