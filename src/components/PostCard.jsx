import dayjs from "dayjs";
import { sanitizeExcerpt } from "../utils/sanitizeExcerpt";

function PostCard({ posts }) {
  return (
    <>
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-600 p-6 rounded-lg">
            {posts.map((post, index) => {
              console.log(post);

              const featuredImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.link;
              return (
                <div
                  key={index}
                  className="bg-[#545454] p-4 rounded-lg flex flex-col gap-4"
                >
                  {/* Image Box (1:1 Ratio) */}
                  <div className="aspect-square relative w-full bg-[#373434] rounded-md overflow-hidden">
                    <div className="absolute top-3 right-3 bg-[#373434]/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-yellow-400 z-10">
                      {post.category_name || "Poetry"}
                    </div>

                    <img
                      src={featuredImage}
                      alt="Post featured"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <div className="bg-[#4a4a4a] py-2 px-4 rounded text-center text-white ">
                    {post.title.rendered}
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-300 text-sm text-center px-2">
                    {sanitizeExcerpt(post.excerpt.rendered)}
                  </p>

                  {/* Bottom Row: Link and Date */}
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <button className="bg-[#373434] text-white px-4 py-2 rounded text-xs hover:bg-black transition">
                      <a href={post.link}>تشریح پڑھیں</a>
                    </button>
                    <span className="bg-[#373434] text-gray-400 px-4 py-2 rounded text-xs">
                      {dayjs(post.date).format("DD MMM, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default PostCard;
