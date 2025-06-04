import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import transparentHero from '../assets/transparenthero.png';

// Custom styles for Slick carousel dots
const customDotStyles = `
  .project-carousel .slick-dots {
    bottom: -40px;
  }
  .project-carousel .slick-dots li {
    width: 12px;
    height: 12px;
    margin: 0 6px;
  }
  .project-carousel .slick-dots li button {
    width: 12px;
    height: 12px;
    padding: 0;
  }
  .project-carousel .slick-dots li button:before {
    width: 12px;
    height: 12px;
    font-size: 12px;
    color: #CBD5E1;
    opacity: 1;
  }
  .project-carousel .slick-dots li.slick-active button:before {
    color: #00979D;
    opacity: 1;
  }
`;

interface Kit {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface Project {
  projectid: string;
  name: string;
  description: string;
  difficulty: string;
  duration: string;
  detailed_description: string;
  image_url: string;
}

const HomePage: React.FC = () => {
  const [featuredKits, setFeaturedKits] = useState<Kit[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const featuredProjectsRef = useRef<HTMLElement>(null);

  const scrollToFeaturedProjects = () => {
    featuredProjectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Custom arrow components
  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10  hover:scale-110 -mr-5"
      aria-label="Next slide"
    >
      <ChevronRight className="w-9 h-9 text-[#00979D]" />
    </button>
  );

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10  hover:scale-110 -ml-5"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-9 h-9 text-[#00979D]" />
    </button>
  );

  useEffect(() => {
    const fetchFeaturedKits = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(3)
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching featured kits:', error);
          return;
        }

        setFeaturedKits(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured kits:', err);
        setLoading(false);
      }
    };

    fetchFeaturedKits();
  }, []);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('projectid', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching featured projects:', error);
          return;
        }

        setFeaturedProjects(data);
        setProjectsLoading(false);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setProjectsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <div className="space-y-16">
      <style>{customDotStyles}</style>
      {/* Hero Section */}
      <section className="relative bg-white rounded-2xl overflow-hidden">
        <div className="container mx-auto px-4 py-4 md:py-2 flex justify-between items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Start Your Arduino Journey Today with{' '}
              <span className="text-[#00979D]">CircuitNest</span>
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Everything you need to build amazing electronic projects.
              From starter kits to individual components, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/kits"
                className="bg-[#00979D] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
              >
                Explore Starter Kits
              </Link>
              <button
                onClick={scrollToFeaturedProjects}
                className="bg-transparent border-2 border-[#00979D] text-[#00979D] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all"
              >
                Browse Projects
              </button>
            </div>
          </div>
          <div className="hidden md:block w-1/2 relative">
            <img
              src={transparentHero}
              alt="Arduino Hero"
              className="object-contain w-full h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Featured Kits */}
      <section>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Kits</h2>
            <Link 
              to="/kits" 
              className="text-[#00979D] font-medium hover:underline flex items-center"
            >
              View all kits
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00979D]"></div>
              </div>
            ) : (
              featuredKits.map((kit) => (
                <div key={kit.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={kit.image_url} 
                    alt={kit.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{kit.name}</h3>
                    <p className="text-gray-600 mb-4">{kit.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">${kit.price.toFixed(2)}</span>
                      <Link 
                        to={`/kits/${kit.id}`}
                        className="bg-[#00979D] text-white px-4 py-2 rounded hover:bg-[#007A7A] transition-colors"
                      >
                        View Kit
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={featuredProjectsRef} className="bg-gray-50 py-16 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="text-[#00979D] font-medium hover:underline flex items-center"
            >
              All projects
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="px-6">
            {projectsLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00979D]"></div>
              </div>
            ) : (
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={2}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={5000}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                responsive={[
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]}
                className="project-carousel -mx-4"
              >
                {featuredProjects.map((project) => (
                  <div key={project.projectid} className="px-4">
                    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
                      <img 
                        src={project.image_url} 
                        alt={project.name} 
                        className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{project.name}</h3>
                        <p className="text-gray-600 mb-4">
                          {project.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <span className={`
                            px-2 py-1 rounded mr-2
                            ${project.difficulty === 'Beginner' ? 'bg-blue-100 text-blue-800' : ''}
                            ${project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${project.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' : ''}
                          `}>
                            {project.difficulty}
                          </span>
                          <span>Estimated time: {project.duration}</span>
                        </div>
                        <Link 
                          to={`/projects/${project.projectid}`}
                          className="text-[#00979D] font-medium hover:underline inline-flex items-center"
                        >
                          Learn more
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose CircuitNest</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Quality Components</h3>
              <p className="text-gray-600">
                We source only the highest quality Arduino components and parts for our kits.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Beginner Friendly</h3>
              <p className="text-gray-600">
                Detailed guides and project tutorials make Arduino accessible for everyone.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Shipping</h3>
              <p className="text-gray-600">
                Get your Arduino kits and components quickly with our expedited shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#00979D] text-white rounded-xl py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for the latest Arduino projects, tutorials, and exclusive deals.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-800 px-6 py-3 rounded-r-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;