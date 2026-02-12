import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import './PostStyles.css'; 
import dayjs from 'dayjs';

const SinglePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [sidebarPosts, setSidebarPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        const [res, sidebarRes] = await Promise.all([
          axios.get(`https://api.aainaeiqbal.co.in/wp-json/wp/v2/posts?slug=${slug}&_embed`),
          axios.get(`https://api.aainaeiqbal.co.in/wp-json/wp/v2/posts?per_page=5&_embed`)
        ]);

        if (res.data.length > 0) {
          setPost(res.data[0]);
          setSidebarPosts(sidebarRes.data);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFullData();
  }, [slug]);

  // GSAP entrance after data loads
  useEffect(() => {
    if (!post) return;
    const els = [titleRef.current, metaRef.current, contentRef.current].filter(Boolean);
    gsap.set(els, { opacity: 0, y: 20 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.1,
    });

    // Sidebar stagger
    if (sidebarRef.current) {
      const sidebarChildren = sidebarRef.current.children;
      gsap.set(sidebarChildren, { opacity: 0, y: 20 });
      gsap.to(sidebarChildren, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.25,
      });
    }
  }, [post, sidebarPosts]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bio-spinner" />
    </div>
  );
  
  if (!post && !loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
      Post not found.
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-[100%] mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- MAIN CONTENT AREA (8 Columns) --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Post Title Card */}
            <div ref={titleRef} className="post-card hero-card rounded-xl py-6 px-4 text-center">
              <h1 className="text-4xl md:text-[3.5rem] leading-relaxed text-[#F5EDE0]" 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </div>

            {/* 2. Meta Info Bar */}
            <div ref={metaRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="post-card rounded-xl p-4 text-center">
                <span className="text-[#C8A961]/60 block text-xs uppercase tracking-wider mb-1">Date</span>
                <span className="font-medium text-[#F5EDE0]">{dayjs(post.date).format("DD MMM, YYYY")}</span>
              </div>
              <div className="post-card rounded-xl p-4 text-center">
                <span className="text-[#C8A961]/60 block text-xs uppercase tracking-wider mb-1">Category</span>
                <span className="font-medium text-[#F5EDE0]">{post._embedded?.['wp:term']?.[0]?.[1]?.name || post._embedded?.['wp:term']?.[0]?.[0]?.name || "Uncategorized"}</span>
              </div>
              <div className="post-card rounded-xl p-4 text-center">
                <span className="text-[#C8A961]/60 block text-xs uppercase tracking-wider mb-1">Writer</span>
                <span className="font-medium text-[#F5EDE0] uppercase">{post._embedded?.author?.[0]?.name || "Aaina e Iqbal"}</span>
              </div>
            </div>

            {/* 3. Post Content */}
            <div ref={contentRef} className="post-card rounded-xl p-6 md:py-12 md:px-8">
              <div 
                className="wp-content-render text-right dir-rtl text-xl leading-[2.5]"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
              />
            </div>
          </div>

          {/* --- SIDEBAR AREA (4 Columns) --- */}
          <div ref={sidebarRef} className="lg:col-span-4 space-y-5">
            
            {/* a) Featured Image */}
            <div className="post-card rounded-xl p-3 overflow-hidden">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} 
                  alt="Featured" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* b) Back to Posts */}
            <button
              onClick={() => navigate("/posts")}
              className="w-full py-3 text-center cursor-pointer rounded-xl border border-[#C8A961]/30 text-[#C8A961] hover:bg-[#C8A961]/10 hover:border-[#C8A961]/50 transition-all duration-300 tracking-wider"
            >
              ← Back to Posts
            </button>

            {/* c) Related Posts */}
            {sidebarPosts.map((sPost) => (
              <div 
                key={sPost.id} 
                onClick={() => navigate(`/post/${sPost.slug}`)}
                className="sidebar-post-card post-card rounded-xl p-3 cursor-pointer group transition-all duration-300"
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <img 
                    src={sPost._embedded?.['wp:featuredmedia']?.[0]?.source_url} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt="Related Post"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-sm text-center text-gray-400 group-hover:text-[#F5EDE0] transition-colors duration-300 font-urdu leading-normal" 
                    dangerouslySetInnerHTML={{ __html: sPost.title.rendered }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;