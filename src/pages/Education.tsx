import React, { useState } from 'react';
import { BookOpen, Video, FileText, ExternalLink, Search } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'pdf';
  url: string;
  category: 'adult' | 'children' | 'general';
  tags: string[];
}

const Education: React.FC = () => {
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Proper Brushing Techniques',
      description: 'Learn the correct way to brush your teeth for optimal dental health.',
      type: 'article',
      url: '#',
      category: 'general',
      tags: ['brushing', 'oral hygiene', 'basics']
    },
    {
      id: '2',
      title: 'The Importance of Flossing',
      description: 'Why flossing is crucial for preventing gum disease and maintaining healthy teeth.',
      type: 'article',
      url: '#',
      category: 'adult',
      tags: ['flossing', 'gum health', 'prevention']
    },
    {
      id: '3',
      title: "Caring for Your Child's Teeth",
      description: "A guide for parents on how to care for children's teeth from infancy through adolescence.",
      type: 'pdf',
      url: '#',
      category: 'children',
      tags: ['children', 'parenting', 'pediatric']
    },
    {
      id: '4',
      title: 'Understanding Tooth Sensitivity',
      description: 'Causes of tooth sensitivity and how to manage it effectively.',
      type: 'article',
      url: '#',
      category: 'adult',
      tags: ['sensitivity', 'pain management', 'treatment']
    },
    {
      id: '5',
      title: 'Fun Brushing Songs for Kids',
      description: 'Engaging songs to make brushing fun for children.',
      type: 'video',
      url: '#',
      category: 'children',
      tags: ['children', 'brushing', 'fun']
    },
    {
      id: '6',
      title: 'Nutrition and Dental Health',
      description: 'How your diet affects your teeth and gums.',
      type: 'article',
      url: '#',
      category: 'general',
      tags: ['nutrition', 'diet', 'prevention']
    },
    {
      id: '7',
      title: 'Post-Extraction Care Guide',
      description: 'Important instructions for caring for your mouth after a tooth extraction.',
      type: 'pdf',
      url: '#',
      category: 'adult',
      tags: ['extraction', 'aftercare', 'recovery']
    },
    {
      id: '8',
      title: 'Braces Care Instructions',
      description: 'How to properly care for braces to ensure effective treatment.',
      type: 'video',
      url: '#',
      category: 'general',
      tags: ['braces', 'orthodontics', 'care']
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredResources = resources.filter(resource => {
    if (activeCategory !== 'all' && resource.category !== activeCategory) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-orange-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Educational Resources</h2>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeCategory === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setActiveCategory('adult')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeCategory === 'adult'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              For Adults
            </button>
            <button
              onClick={() => setActiveCategory('children')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeCategory === 'children'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              For Children
            </button>
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeCategory === 'general'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              General
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  <div className="mt-4">
                    {resource.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <a
                    href={resource.url}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
                  >
                    View Resource
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Post-Treatment Care Instructions</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-blue-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-blue-700">After a Filling</h4>
            </div>
            <div className="p-4">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Avoid eating until the numbness wears off to prevent biting your cheek or tongue</li>
                <li>It's normal to experience sensitivity to hot and cold for a few days</li>
                <li>Avoid very hot or cold foods for 24-48 hours</li>
                <li>If pain persists for more than a week, contact our office</li>
              </ul>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-green-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-green-700">After a Cleaning</h4>
            </div>
            <div className="p-4">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Continue your regular brushing and flossing routine</li>
                <li>If your gums are tender, rinse with warm salt water</li>
                <li>Avoid smoking for at least 24 hours</li>
                <li>If you received fluoride treatment, wait 30 minutes before eating or drinking</li>
              </ul>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-red-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-red-700">After an Extraction</h4>
            </div>
            <div className="p-4">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Bite firmly on gauze for 30-60 minutes to control bleeding</li>
                <li>Apply ice to reduce swelling (20 minutes on, 20 minutes off)</li>
                <li>Do not rinse, spit, or use a straw for 24 hours</li>
                <li>Eat soft foods and avoid the extraction site when chewing</li>
                <li>Take prescribed medications as directed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;