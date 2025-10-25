import React, { useState } from 'react';
import { Award, BookOpen, Palette, Star, ChevronDown, ChevronUp } from 'lucide-react';

const ArtistBio = ({ artist }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const bio = artist.fullBio || `${artist.name} is a renowned contemporary artist known for their distinctive approach to ${artist.specialty || 'abstract art'}. With a career spanning over ${artist.yearsActive || 5} years, their work has been featured in galleries and collections worldwide.

Their unique style combines traditional techniques with modern sensibilities, creating pieces that resonate with both critics and collectors. Each artwork tells a story, inviting viewers to explore deeper meanings and emotional connections.

Based in ${artist.location || 'their studio'}, they continue to push the boundaries of contemporary art, experimenting with new materials and concepts while staying true to their artistic vision.`;

  const achievements = artist.achievements || [
    { 
      year: '2023', 
      title: 'Featured in Contemporary Art Magazine',
      description: 'Cover story highlighting innovative techniques'
    },
    { 
      year: '2022', 
      title: 'Solo Exhibition at Modern Gallery',
      description: 'Critically acclaimed show with record attendance'
    },
    { 
      year: '2021', 
      title: 'Winner - Emerging Artist Award',
      description: 'Recognized for outstanding contribution to contemporary art'
    }
  ];

  const education = artist.education || [
    { 
      year: '2015-2019', 
      degree: 'Bachelor of Fine Arts',
      institution: 'Royal College of Art'
    },
    { 
      year: '2013-2015', 
      degree: 'Foundation in Art & Design',
      institution: 'Central Saint Martins'
    }
  ];

  const influences = artist.influences || [
    'Abstract Expressionism',
    'Color Field Painting',
    'Contemporary Minimalism',
    'Japanese Aesthetics'
  ];

  return (
    <div className="space-y-8">
      {/* Biography */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg animate-appear">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About the Artist</h2>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <div className={`text-gray-600 dark:text-gray-400 leading-relaxed ${!isExpanded && 'line-clamp-6'}`}>
            {bio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold mt-4 transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg animate-appear opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
          </div>

          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="relative pl-8 pb-6 border-l-2 border-purple-200 dark:border-purple-800 last:border-l-0 last:pb-0"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full border-2 border-white dark:border-gray-800" />
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
                    {achievement.year}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Influences */}
        <div className="space-y-8">
          {/* Education */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg animate-appear opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gradient-to-br from-gray-50 to-purple-50/50 dark:from-gray-700/50 dark:to-purple-900/20 rounded-xl"
                >
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-1">
                    {edu.year}
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white mb-1">
                    {edu.degree}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Influences */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg animate-appear opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Influences</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {influences.map((influence, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold"
                >
                  {influence}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;