import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to AlgoVisualizer
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Master Data Structures and Algorithms through interactive visualizations. 
            Learn, practice, and understand complex algorithms with our step-by-step visual guides.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Visualize Algorithms</h2>
              <p className="text-gray-300 mb-6">
                Watch algorithms come to life with our interactive visualizations. 
                Understand how each step works in real-time.
              </p>
              <Link 
                to="/practice" 
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Start Learning
              </Link>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-4">Practice DSA</h2>
              <p className="text-gray-300 mb-6">
                Test your knowledge with our comprehensive practice problems. 
                From basic to advanced, we've got you covered.
              </p>
              <Link 
                to="/practice" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Practice Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 