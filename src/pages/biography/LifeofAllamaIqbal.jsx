import React, { useEffect, useState } from "react";
import './LifeofAllamaIqbal.css';

function LifeofAllamaIqbal() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    fetch("https://api.aainaeiqbal.co.in/wp-json/wp/v2/pages/1196")
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
      });
  }, []);

  if (!page) {
    
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">
      <title>Allama Iqbal Biography</title>
      <div className="md:max-w-[90%] mx-auto p-4 md:p-10">
        
        {/* Title Section */}
        <div className="bg-[#373434] py-8 px-4 rounded-lg border border-gray-700 text-center shadow-xl mb-8">
          <h1 
            className="text-3xl md:text-5xl leading-tight "
            dangerouslySetInnerHTML={{ __html: page.title.rendered }} 
          />
        </div>

        {/* Content Section */}
        <div className="bg-[#373434] p-6 md:p-12 rounded-lg border border-gray-700 shadow-lg">
          <div 
            className="wp-page-content text-right text-lg md:text-xl leading-relaxed space-y-6"
            style={{ direction: 'rtl' }} // Ensures Right-to-Left alignment for the text
            dangerouslySetInnerHTML={{ __html: page.content.rendered }} 
          />
        </div>

      </div>
    </div>
  );
}

export default LifeofAllamaIqbal;