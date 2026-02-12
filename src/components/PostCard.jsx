import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import gsap from "gsap";
import { sanitizeExcerpt } from "../utils/sanitizeExcerpt";
import { Link } from "react-router-dom";

function PostCard({ posts }) {
  const cardsRef = useRef([]);

  // GSAP stagger entrance — cards fade in one by one on mount
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 30 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.1,
    });
  }, [posts]);

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.link;
            const categoryName =
              post._embedded?.["wp:term"]?.[0]?.[1]?.name || "All Posts";

            return (
              <div
                key={post.id || index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="post-card group rounded-xl overflow-hidden transition-all duration-300"
              >
                {/* Image */}
                <Link to={`/post/${post.slug}`} className="block relative overflow-hidden aspect-4/3">
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Category pill */}
                  <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-[#C8A961] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                    {categoryName}
                  </span>
                </Link>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Title */}
                  <div className="flex justify-between items-center">
                  

                  {/* Excerpt */}
                  <p className="text-gray-400 text-base leading-relaxed line-clamp-2">
                    {sanitizeExcerpt(post.excerpt.rendered)}
                  </p>
                      <Link to={`/post/${post.slug}`}>
                    <h3
                      className="text-[#F5EDE0] text-2xl leading-snug hover:text-[#C8A961] transition-colors duration-300 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </Link>
                  </div>

                  {/* Bottom: Date + Read link */}
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <span className="text-gray-500 text-sm">
                      {dayjs(post.date).format("DD MMM, YYYY")}
                    </span>
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-[#C8A961]/70 text-sm tracking-wider hover:text-[#C8A961] transition-colors duration-300 group-hover:text-[#C8A961]"
                    >
                      تشریح پڑھیں ←
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PostCard;
