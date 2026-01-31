import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Stanza = ({ posts }) => {
  const [randomStanzas, setRandomStanzas] = useState([]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      // 1. Shuffle the original posts array first to ensure randomness
      const shuffledPosts = [...posts].sort(() => 0.5 - Math.random());
      
      const selectedStanzas = [];
      const stanzaRegex = /<h3[^>]*>([\s\S]*?)<\/h3>/g;

      // 2. Iterate through shuffled posts and take only ONE stanza per post
      for (const post of shuffledPosts) {
        if (selectedStanzas.length >= 2) break; // Limit to 2 stanzas total

        const content = post.content.rendered;
        const matches = [...content.matchAll(stanzaRegex)];

        if (matches.length > 0) {
          // Pick a random H3 from this specific post
          const randomMatch = matches[Math.floor(Math.random() * matches.length)];
          
          selectedStanzas.push({
            text: randomMatch[1],
            slug: post.slug,
            title: post.title.rendered, // Post Title for the left badge
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
            category: post._embedded?.['wp:term']?.[0]?.[1]?.name || "Poetry"
          });
        }
      }

      setRandomStanzas(selectedStanzas);
    }
  }, [posts]);

  if (randomStanzas.length === 0) return null;

  return (
    <div className="bg-[#1a1a1a] py-12 px-4 md:px-10">
      <div className="text-center mb-12">
        <h2 className="text-white border-2 w-2xl mx-auto rounded-b-lg pb-3 opacity-50 text-4xl md:text-6xl">اشعار</h2>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {randomStanzas.map((item, index) => (
          <Link 
            to={`/post/${item.slug}`} 
            key={index}
            className="block group"
          >
            <div 
              className="relative w-full min-h-[300px] md:min-h-[350px] rounded-xl overflow-hidden border border-gray-700 shadow-2xl transition-all duration-300 group-hover:scale-[1.01]"
              style={{
                backgroundImage: `url(${item.image || 'https://via.placeholder.com/1200x600'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>

              <div className="relative z-10 h-full flex flex-col p-6 md:p-12">
                
                {/* TOP BAR: Title on Left, Category on Right */}
                <div className="flex justify-between items-start gap-4">
                  {/* Post Title Badge (Left) */}
                  <div className="bg-[#1f1e1e]/80 text-gray-200 px-4 py-2 rounded-lg text-xs md:text-xl border border-gray-600 max-w-[45%] truncate">
                    <span dangerouslySetInnerHTML={{ __html: item.title }} />
                  </div>

                  {/* Category Badge (Right) */}
                  <div className="bg-[#1f1e1e]/80 text-gray-200 px-4 py-2 rounded-lg text-xs md:text-sm border border-gray-600 uppercase tracking-widest font-sans">
                    {item.category}
                  </div>
                </div>

                {/* Stanza Text (Centered) */}
                <div className="flex-grow flex items-center justify-center py-8">
                  <h4 
                    className="text-white text-center text-2xl md:text-4xl leading-[2] md:leading-[2.5] max-w-4xl"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stanza;