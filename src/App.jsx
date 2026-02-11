import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import SinglePost from "./pages/SinglePosts/SinglePost";
import { ScrollToTop } from "./components/ScrollTop";
import LifeofAllamaIqbal from "./pages/biography/LifeofAllamaIqbal";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import { usePreloader } from "./hooks/usePreloader";

function App() {
  const [posts, setPosts] = useState([]);
  const [splashDone, setSplashDone] = useState(false);

  const baseURL =
    "https://api.aainaeiqbal.co.in/wp-json/wp/v2/posts?_embed&per_page=12";

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`${baseURL}&_embed&t=${Date.now()}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (posts.length === 0) {
      getPosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isReady, progress } = usePreloader(posts.length > 0);

  return (
    <div>
      {!splashDone && (
        <SplashScreen
          isReady={isReady}
          progress={progress}
          onComplete={() => setSplashDone(true)}
        />
      )}
      <Navbar />
      <div className="pt-20">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route path="/post/:slug" element={<SinglePost posts={posts} />} />
        <Route path="/biography-allama-iqbal" element={<LifeofAllamaIqbal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer posts={posts} />
      </div>
    </div>
  );
}

export default App;
