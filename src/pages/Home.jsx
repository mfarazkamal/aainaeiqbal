import Hero from "../components/Hero";
import PostCard from "../components/PostCard";

function Home({ posts }) {
  return (
    <>
      <title>Aaina e Iqbal - Reflection of Knowledge Towards Reality</title>
      <Hero />
      <PostCard posts={posts}/>
    </>
  );
}

export default Home;
