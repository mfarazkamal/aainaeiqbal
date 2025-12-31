import { Route, Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Posts from "./pages/Posts"
import LifeOfAllamaIqbal from "./pages/LifeOfAllamaIqbal"
import Home from "./pages/Home"

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/lifeOfAllamaIqbal" element={<LifeOfAllamaIqbal />} />
      </Routes>
    </div>
  )
}

export default App