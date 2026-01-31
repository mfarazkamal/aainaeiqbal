import { useState } from "react";
import { Link } from "react-router-dom";
// Optional: Install lucide-react for icons: npm install lucide-react
import { Menu, X } from "lucide-react"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative z-[100]"> {/* Ensure Navbar is above content */}
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
          <Link to={"/"} className="hover:text-gray-400">Home</Link>
          <Link to={"/posts"} className="hover:text-gray-400">Posts</Link>
          {/* <Link to={"https://aainaeiqbal.co.in/life-of-dr-allama-iqbal/"} className="hover:text-gray-400">Life of Allama Iqbal</Link> */}
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
          <Link to={"/"} onClick={toggleMenu}>Home</Link>
          <Link to={"/posts"} onClick={toggleMenu}>Posts</Link>
          <a href="https://aainaeiqbal.co.in/life-of-dr-allama-iqbal/" onClick={toggleMenu}>Life of Allama Iqbal</a>
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