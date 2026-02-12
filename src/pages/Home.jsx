import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import Stanza from "../components/Stanza";

function Home({ posts }) {
  return (
    <>
      <title>Aaina e Iqbal - Reflection of Knowledge Towards Reality</title>
      <Hero />
      <Stanza posts={posts} />
      <div className="rounded py-3 px-8 text-center w-full mx-auto">
        <h2 className="text-white text-[2.5rem]   uppercase">
          علامہ اقبال کے نظموں کی تازہ ترین پوسٹز کی تشریح
        </h2>
      </div>
      <PostCard posts={posts.slice(0, 3)} />
      <div className="flex justify-center -mt-4 mb-12">
        <Link
          to="/posts"
          className="border border-[#C8A961]/40 text-[#C8A961] px-8 py-3 rounded-lg text-lg tracking-wider hover:bg-[#C8A961]/10 transition-all duration-300 hover:border-[#C8A961]/60"
        >
          مزید پوسٹس / View All Posts →
        </Link>
      </div>
    </>
  );
}

export default Home;
