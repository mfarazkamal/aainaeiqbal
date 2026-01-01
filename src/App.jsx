import { Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Posts from "./pages/Posts";
// import LifeOfAllamaIqbal from "./pages/LifeOfAllamaIqbal";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://aainaeiqbal.co.in/wp-json/wp/v2/posts?_embed")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        {/* <Route path="/lifeOfAllamaIqbal" element={<LifeOfAllamaIqbal />} /> */}
      </Routes>
    </div>
  );
}

export default App;
