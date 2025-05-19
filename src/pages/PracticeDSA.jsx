import React from 'react';

const topics = [
  {
    id: 1,
    name: 'Arrays',
    description: 'Master array manipulation, searching, and sorting techniques.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Linked List',
    description: 'Learn singly, doubly, and circular linked list operations.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    name: 'Stacks',
    description: 'Understand LIFO data structure and its applications.',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    name: 'Queues',
    description: 'Explore FIFO data structure and its implementations.',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 5,
    name: 'Trees',
    description: 'Study binary trees, BST, AVL, and tree traversal algorithms.',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 6,
    name: 'Graphs',
    description: 'Learn graph representations and traversal algorithms.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 7,
    name: 'Recursion',
    description: 'Master recursive problem-solving techniques.',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 8,
    name: 'Dynamic Programming',
    description: 'Solve complex problems using optimal substructure.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 9,
    name: 'Greedy Algorithms',
    description: 'Learn to make locally optimal choices for global solutions.',
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 10,
    name: 'Backtracking',
    description: 'Explore systematic search and constraint satisfaction.',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 11,
    name: 'Sorting',
    description: 'Master various sorting algorithms and their complexities.',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 12,
    name: 'Searching',
    description: 'Learn efficient search algorithms and their applications.',
    color: 'from-violet-500 to-violet-600'
  }
];

const PracticeDSA = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Practice DSA
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`h-2 bg-gradient-to-r ${topic.color}`} />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {topic.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {topic.description}
                </p>
                <button
                  className={`w-full py-2 px-4 rounded-md text-white font-medium bg-gradient-to-r ${topic.color} hover:opacity-90 transition-opacity`}
                >
                  Start Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeDSA; 