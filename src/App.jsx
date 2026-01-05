import { Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Posts from "./pages/Posts";
// import LifeOfAllamaIqbal from "./pages/LifeOfAllamaIqbal";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import SinglePost from "./pages/SinglePosts/SinglePost";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          "https://api.aainaeiqbal.co.in/wp-json/wp/v2/posts?_embed&per_page=12"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route path="/post/:slug" element={<SinglePost />} />
        {/* <Route path="/lifeOfAllamaIqbal" element={<LifeOfAllamaIqbal />} /> */}
      </Routes>
      <Footer posts={posts} />
    </div>
  );
}

export default App;
