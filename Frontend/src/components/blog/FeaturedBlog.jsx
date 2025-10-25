import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Star } from 'lucide-react';

const FeaturedBlog = ({ blog }) => {
  return (
    <article className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl animate-appear">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative aspect-video lg:aspect-auto overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-white/50 to-transparent dark:from-gray-800 dark:via-gray-800/50 dark:to-transparent" />
          
          {/* Featured Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold text-sm shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
          {/* Category */}
          <div className="inline-block self-start px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
            {blog.category}
          </div>

          {/* Title */}
          <Link to={`/blog/${blog.id}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {blog.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-lg text-gray-600 dark:text-gray-400 line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <img 
                src={blog.author.avatar} 
                alt={blog.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Written by</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {blog.author.name}
                </p>
              </div>
            </div>

            <Link 
              to={`/blog/${blog.id}`}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Read Article
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedBlog;