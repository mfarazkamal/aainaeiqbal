import { useState } from "react";
import { NavLink, Link } from "react-router-dom"; // Use NavLink for active states
import { Menu, X } from "lucide-react"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper function for active styles to keep code clean
  const navStyles = ({ isActive }) => 
    `transition-all duration-300 pb-1 border-b-2 ${
      isActive ? "border-white text-white" : "border-transparent text-gray-300 hover:text-white"
    }`;

  return (
    <div className="relative z-[100]">
      <div className="flex justify-around h-20 items-center p-2 mb-4 mt-1 bg-[#373434] text-white">
        <div>
          <Link to={"/"}>
            <h1 className="uppercase tracking-wider text-xl md:text-3xl font-bold cursor-pointer">
              Aaina e Iqbal
            </h1>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-2xl">
          <NavLink to={"/"} className={navStyles}>Home</NavLink>
          <NavLink to={"/posts"} className={navStyles}>Posts</NavLink>
          <NavLink to={"/biography-allama-iqbal"} className={navStyles}>Life of Allama Iqbal</NavLink>
        </nav>

        <button className="hidden md:block border bg-[#1F2430] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-black transition">
          <Link target="_blank" to={"https://forms.gle/fPxL99bGU8dGKSqYA"}>
            Contributor's
          </Link>
        </button>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#373434] border-t border-gray-700 flex flex-col items-center gap-6 py-8 text-xl text-white shadow-2xl z-50">
          <NavLink to={"/"} onClick={toggleMenu} className={navStyles}>Home</NavLink>
          <NavLink to={"/posts"} onClick={toggleMenu} className={navStyles}>Posts</NavLink>
          <NavLink to={"/biography-allama-iqbal"} onClick={toggleMenu} className={navStyles}>Life of Allama Iqbal</NavLink>
          <Link 
            target="_blank" 
            to={"https://forms.gle/fPxL99bGU8dGKSqYA"} 
            className="border bg-[#1F2430] px-8 py-2 rounded-md"
            onClick={toggleMenu}
          >
            Contributor's
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;