import { Route, Router, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Posts from "./pages/Posts"
import LifeOfAllamaIqbal from "./pages/LifeOfAllamaIqbal"

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/lifeOfAllamaIqbal" element={<LifeOfAllamaIqbal />} />
      </Routes>
    </div>
  )
}

export default App