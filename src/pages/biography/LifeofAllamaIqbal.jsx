import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import './LifeofAllamaIqbal.css';

function LifeofAllamaIqbal() {
  const [page, setPage] = useState(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    fetch("https://api.aainaeiqbal.co.in/wp-json/wp/v2/pages/1196")
      .then((res) => res.json())
      .then((data) => {
        setPage(data);
      });
  }, []);

  // GSAP entrance after data loads
  useEffect(() => {
    if (!page) return;
    const els = [titleRef.current, contentRef.current].filter(Boolean);
    gsap.set(els, { opacity: 0, y: 25 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1,
    });
  }, [page]);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bio-spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <title>Allama Iqbal Biography</title>
      <div className="md:max-w-[90%] mx-auto p-4 md:p-6">
        
        {/* Title Section */}
        <div ref={titleRef} className="post-card hero-card rounded-xl py-4 px-4 text-center mb-8">
          <h1 
            className="text-3xl md:text-5xl leading-tight text-[#F5EDE0]"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }} 
          />
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="post-card rounded-xl p-6 md:p-4">
          <div 
            className="wp-page-content text-right text-lg md:text-xl leading-relaxed space-y-6"
            style={{ direction: 'rtl' }}
            dangerouslySetInnerHTML={{ __html: page.content.rendered }} 
          />
        </div>

      </div>
    </div>
  );
}

export default LifeofAllamaIqbal;