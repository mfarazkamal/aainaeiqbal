import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added navigate for back handling
import axios from 'axios';
import './PostStyles.css'; 
import dayjs from 'dayjs';

const SinglePost = () => {
  const { slug } = useParams();
  const navigate = useNavigate(); // Important for "Back" button behavior
  
  const [post, setPost] = useState(null);
  const [sidebarPosts, setSidebarPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        setLoading(true);
        // FIX for Mobile: Force browser to top of page on load
        window.scrollTo(0, 0);

        const [res, sidebarRes] = await Promise.all([
          axios.get(`https://api.aainaeiqbal.co.in/wp-json/wp/v2/posts?slug=${slug}&_embed`),
          axios.get(`https://api.aainaeiqbal.co.in/wp-json/wp/v2/posts?per_page=3&_embed`)
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

  // Updated check: If not loading and still no post, it prevents the "stuck" black screen
  if (loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Loading...</div>;
  
  if (!post && !loading) return <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">Post not found.</div>;

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">
      <div className="max-w-[100%] mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- MAIN CONTENT AREA (8 Columns) --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Post Title Card */}
            <div className="bg-[#373434] py-6 rounded-lg border border-gray-700 text-center shadow-xl">
              <h1 className="text-4xl md:text-[3.5rem] leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </div>

            {/* 2. Meta Info Bar (Responsive) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#373434] p-4 rounded border border-gray-700 text-center">
                <span className="text-gray-400 block text-xs uppercase mb-1">Date</span>
                <span className="font-medium">{dayjs(post.date).format("DD MMM, YYYY")}</span>
              </div>
              <div className="bg-[#373434] p-4 rounded border border-gray-700 text-center">
                <span className="text-gray-400 block text-xs uppercase mb-1">Category</span>
                <span className="font-medium">{post._embedded?.['wp:term']?.[0]?.[1]?.name || post._embedded?.['wp:term']?.[0]?.[0]?.name || "Uncategorized"}</span>
              </div>
              <div className="bg-[#373434] p-4 rounded border border-gray-700 text-center">
                <span className="text-gray-400 block text-xs uppercase mb-1">Writer</span>
                <span className="font-medium uppercase">{post._embedded?.author?.[0]?.name || "Aaina e Iqbal"}</span>
              </div>
            </div>

            {/* 3. Post Content (Fetched from WP) */}
            <div className="bg-[#373434] p-6 md:py-12 rounded-lg border border-gray-700 shadow-lg">
              <div 
                className="wp-content-render text-right dir-rtl text-xl leading-[2.5]"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
              />
            </div>
          </div>

          {/* --- SIDEBAR AREA (4 Columns) --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* a) Current Featured Image */}
            <div className="bg-[#373434] p-3 rounded-lg border border-gray-700 shadow-md">
              <div className="aspect-square rounded overflow-hidden">
                <img 
                  src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} 
                  alt="Featured" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* b) Calendar Widget Placeholder */}
            <div className="bg-[#373434] p-6 rounded-lg border border-gray-700 text-center">
              <h3 className="text-sm font-bold border-b border-gray-600 pb-2 mb-4">CALENDAR</h3>
              <div className="text-gray-500 italic text-sm">WP Calendar Content</div>
            </div>

            {/* c) Random Posts from Category */}
            {sidebarPosts.map((sPost) => (
              <div 
                key={sPost.id} 
                onClick={() => navigate(`/post/${sPost.slug}`)} // Use navigate instead of <a> for speed
                className="bg-[#373434] p-4 rounded-lg border border-gray-700 hover:bg-[#444] transition-all cursor-pointer"
              >
                <div className="aspect-video rounded overflow-hidden mb-3">
                  <img 
                    src={sPost._embedded?.['wp:featuredmedia']?.[0]?.source_url} 
                    className="w-full h-full object-cover" 
                    alt="Random Post"
                  />
                </div>
                <h4 className="text-sm text-center font-urdu leading-normal" 
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