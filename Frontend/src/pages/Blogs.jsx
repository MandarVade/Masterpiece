import React from 'react';
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import FeaturedBlog from '../components/blog/FeaturedBlog';
import { blogs, blogCategories } from '../data/blogs';

const Blogs = () => {
  // Since the new data doesn't have a featured field, we'll use the first blog as featured
  const featuredBlog = blogs[0];
  const regularBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6 animate-appear">
            <TrendingUp className="w-4 h-4" />
            <span>Latest Insights & Stories</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
            Art & Culture Blog
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
            Explore stories, insights, and inspiration from the world of art
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-appear opacity-0 delay-500" style={{ animationFillMode: 'forwards' }}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input 
                type="text"
                placeholder="Search articles..."
                className="w-full pl-16 pr-6 py-5 bg-white dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4">
          {blogCategories.map((category, index) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 animate-appear opacity-0 ${
                index === 0
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Blog */}
        {featuredBlog && (
          <div className="mb-16">
            <FeaturedBlog blog={featuredBlog} />
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {regularBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
            Load More Articles
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Newsletter */}

      </div>
    </div>
  );
};

export default Blogs;