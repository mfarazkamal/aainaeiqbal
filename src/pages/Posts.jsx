import PostCard from "../components/PostCard";

const Posts = ({ posts }) => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-2 border-gray-500 rounded-xl py-3 px-8 mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-white text-[2.5rem]   uppercase">
            علامہ اقبال کے نظموں کی تشریح
          </h2>
        </div>

       <PostCard posts={posts} />
      </div>
    </section>
  );
};

export default Posts;
