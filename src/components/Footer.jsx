import { useEffect, useRef } from "react";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Footer = ({ posts }) => {
  const dividerRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const cols = [col1Ref.current, col2Ref.current, col3Ref.current].filter(Boolean);

    // Check if footer is already in viewport (short pages)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Divider draws from center
          gsap.fromTo(dividerRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power2.out" }
          );
          // Columns stagger in
          gsap.fromTo(cols,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
          );
          // Copyright
          gsap.fromTo(bottomRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, delay: 0.6 }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (dividerRef.current?.parentElement) {
      observer.observe(dividerRef.current.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="px-4 md:px-6 pb-6 pt-2">
      {/* Golden top divider */}
      <div
        ref={dividerRef}
        className="h-px max-w-7xl mx-auto mb-8 origin-center"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,97,0.3), transparent)", transform: "scaleX(0)" }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Brand */}
        <div ref={col1Ref} className="post-card rounded-xl  p-6 flex flex-col items-center text-center">
          <h2 className="navbar-logo text-4xl mb-1">آئینہ اقبال</h2>
          <p className="text-[#C8A961]/60 text-xs tracking-[0.2em] uppercase mb-5">
            Reflection of Knowledge Towards Reality
          </p>
          <div className="w-full rounded-lg overflow-hidden border bg-white/70 py-6  border-white/5">
            <img
              src="/cover.png"
              alt="Aaina e Iqbal Cover"
              className="w-full h-52 object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Column 2: Latest Posts */}
        <div ref={col2Ref} className="post-card rounded-xl p-6">
          <h3 className="text-[#C8A961] text-lg tracking-wider mb-5 text-center">Latest Posts</h3>
          <ul className="space-y-2">
            {posts.slice(0, 6).map((post) => (
              <li key={post.id}>
                <Link
                  to={`/post/${post.slug}`}
                  className="block text-gray-400 text-base text-right py-1.5 border-b border-white/5 hover:text-[#F5EDE0] transition-colors duration-300"
                  style={{ direction: "rtl" }}
                >
                  {post.title.rendered}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Connect */}
        <div ref={col3Ref} className="post-card rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-[#C8A961] text-lg tracking-wider mb-5">Social Media</h3>

          {/* Social Icons */}
          <div className="flex gap-3 mb-6">
            <a
              href="https://chat.whatsapp.com/DWUXnZYQ1ePI9k5eO6f4k1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/10 text-gray-400 flex items-center justify-center text-sm hover:border-[#C8A961]/40 hover:text-[#C8A961] transition-all duration-300"
            >
              WA
            </a>
            <a
              href="https://facebook.com/aainaeiqbal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/10 text-gray-400 flex items-center justify-center hover:border-[#C8A961]/40 hover:text-[#C8A961] transition-all duration-300"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com/aainaeiqbal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-white/10 text-gray-400 flex items-center justify-center hover:border-[#C8A961]/40 hover:text-[#C8A961] transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Quick Links */}
          <h3 className="text-[#C8A961]/60 text-xs tracking-wider uppercase mb-3">Quick Links</h3>
          <div className="w-full flex flex-col gap-2">
            <Link
              to="/posts"
              className="block text-center text-gray-400 py-2 rounded-lg border border-white/5 hover:text-[#F5EDE0] hover:border-[#C8A961]/20 transition-all duration-300"
            >
              Posts
            </Link>
            <Link
              to="/biography-allama-iqbal"
              className="block text-center text-gray-400 py-2 rounded-lg border border-white/5 hover:text-[#F5EDE0] hover:border-[#C8A961]/20 transition-all duration-300"
            >
              Life of Allama Iqbal
            </Link>
            <a
              href="https://forms.gle/fPxL99bGU8dGKSqYA"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-gray-400 py-2 rounded-lg border border-white/5 hover:text-[#F5EDE0] hover:border-[#C8A961]/20 transition-all duration-300"
            >
              Contributor's / معاون
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div ref={bottomRef} className="max-w-7xl mx-auto mt-8 pt-4 border-t border-white/5 text-center" style={{ opacity: 0 }}>
        <p className="text-gray-600 text-sm tracking-wider">
          © {new Date().getFullYear()} Aaina e Iqbal — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
