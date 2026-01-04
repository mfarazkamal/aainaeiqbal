import React from 'react';

const Footer = () => {
  // Dummy data for WordPress posts
  const latestPosts = [
    { id: 1, title: "Bang-e-Dara: An Introduction", link: "#" },
    { id: 2, title: "Concept of Khudi (Selfhood)", link: "#" },
    { id: 3, title: "Iqbal's Vision of Youth", link: "#" },
    { id: 4, title: "The Message of Bal-e-Jibril", link: "#" },
    { id: 5, title: "Historical Context of Allahabad Address", link: "#" },
  ];

  return (
    <footer className="bg-[#373434] p-6 md:p-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 justify-between gap-6">
        
        {/* Card 1: Branding & Image */}
        <div className="bg-[#B3B3B3] p-6 rounded-lg flex flex-col items-center text-center">
          <h2 className="text-3xl  mb-1">آئینہ اقبال</h2>
          <p className="text-lg font-medium mb-4">Reflection of Knowledge Towards Reality</p>
          <div className="w-full h-60 bg-[#545454] rounded-md overflow-hidden flex items-start justify-center">
             {/* Replace with actual <img> tag */}
            <img src="./cover.png" alt="" />
          </div>
        </div>

        {/* Card 2: Latest Posts (WP Fetch placeholder) */}
        <div className="bg-[#B3B3B3] p-6 rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-mono mb-6">Latest Posts</h2>
          <ul className="w-full space-y-3">
            {latestPosts.map((post) => (
              <li key={post.id} className="text-center">
                <a href={post.link} className="hover:underline text-lg block border-b border-gray-400 pb-1">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Social & Navigation */}
        <div className="bg-[#B3B3B3] p-6 rounded-lg flex flex-col items-center">
          <p className="font-bold mb-4 uppercase tracking-wider">Share Buttons</p>
          
          {/* Social Icons Row */}
          <div className="flex gap-3 mb-6">
            <button className="w-16 cursor-pointer h-16 bg-[#373434] text-white rounded-lg text-xs flex items-center justify-center px-1">whatsapp</button>
            <button className="w-16 cursor-pointer h-16 bg-[#373434] text-white rounded-lg text-sm flex items-center justify-center">FB</button>
            <button className="w-16 cursor-pointer h-16 bg-[#373434] text-white rounded-lg text-sm flex items-center justify-center">Insta</button>
          </div>

          {/* Navigation Buttons Stack */}
          <div className="w-full flex flex-col gap-3">
            <button className="w-full py-3 cursor-pointer bg-[#373434] text-white rounded-lg hover:bg-black transition-colors">
              All Posts
            </button>
            <button className="w-full py-3 cursor-pointer bg-[#373434] text-white rounded-lg hover:bg-black transition-colors">
              Life of Allama Iqbal
            </button>
            <button className="w-full py-3 cursor-pointer bg-[#373434] text-white rounded-lg hover:bg-black transition-colors flex justify-center gap-2">
              Contribute / <span>معاون</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;