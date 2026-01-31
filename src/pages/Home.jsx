import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import Stanza from "../components/Stanza";

function Home({ posts }) {
  return (
    <>
      <title>Aaina e Iqbal - Reflection of Knowledge Towards Reality</title>
      <Hero />
      <Stanza posts={posts} />
      <div className="bg-zinc-800 rounded py-3 px-8 text-center w-full mx-auto">
        <h2 className="text-white text-[2.5rem]   uppercase">
          علامہ اقبال کے نظموں کی تازہ ترین پوسٹز کی تشریح
        </h2>
      </div>
      <PostCard posts={posts} />
    </>
  );
}

export default Home;
