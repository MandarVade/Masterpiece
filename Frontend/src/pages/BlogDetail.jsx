import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, Heart, Calendar, Share2, ArrowLeft } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { blogs } from '../data/blogs';
import { formatDate } from '../utils/helpers';

const BlogDetail = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  
  const blog = blogs.find(b => b.slug === slug);
  const relatedBlogs = blogs.filter(b => b.category === blog?.category && b.id !== blog?.id).slice(0, 3);

  if (!blog) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Blog Not Found</h2>
          <Link to="/blogs" className="text-blue-600 hover:text-blue-700">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Back Button */}
        <Link to="/blogs" className={`inline-flex items-center gap-2 mb-6 ${isDark ? 'text-white hover:text-blue-400' : 'text-white hover:text-blue-200'} transition-colors`}>
          <ArrowLeft size={20} />
          Back to Blogs
        </Link>

        {/* Article Header */}
        <article className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl mb-12`}>
          <div className="p-8 md:p-12">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
              {blog.category}
            </span>
            
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <img src={blog.author.avatar} alt={blog.author.name} className="w-16 h-16 rounded-full" />
                <div>
                  <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {blog.author.name}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {blog.author.bio}
                  </div>
                  <div className={`flex items-center gap-1 text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar size={14} />
                    {formatDate(blog.date)}
                  </div>
                </div>
              </div>
              <button className={`p-3 rounded-full ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                <Share2 size={20} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              </button>
            </div>

            {/* Stats */}
            <div className={`flex items-center gap-6 mb-8 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {blog.readTime} min read
              </span>
              <span className="flex items-center gap-2">
                <Eye size={18} />
                {blog.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-2">
                <Heart size={18} />
                {blog.likes.toLocaleString()} likes
              </span>
            </div>

            {/* Content */}
            <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                {blog.excerpt}
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {blog.content}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className={`px-3 py-1 rounded-lg text-sm ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} to={`/blog/${relatedBlog.slug}`} className="group">
                  <article className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all`}>
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-bold mb-2 line-clamp-2 ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>
                        {relatedBlog.title}
                      </h3>
                      <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Clock size={14} />
                        {relatedBlog.readTime} min
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;