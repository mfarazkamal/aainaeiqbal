import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "../hooks/useScrollDirection";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { direction, isAtTop } = useScrollDirection();

  // Hide navbar on scroll-down, show on scroll-up (never hide if menu is open)
  const isHidden = direction === "down" && !isAtTop && !isOpen;

  // Active link style — golden underline for active, subtle hover for others
  const navStyles = ({ isActive }) =>
    `nav-link-premium text-gray-300 hover:text-[#F5EDE0] transition-colors duration-300 ${
      isActive ? "!text-[#F5EDE0] active" : ""
    }`;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] px-3 md:px-6 pt-3 transition-transform duration-300 ease-in-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="navbar-glass navbar-floating flex justify-between h-20 md:h-[80px] items-center px-4 md:px-6 text-white rounded-2xl max-w-7xl mx-auto">
        <div>
          <Link to={"/"}>
            <h1 className="navbar-logo uppercase tracking-wider text-lg md:text-2xl font-bold cursor-pointer">
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

        <Link
          target="_blank"
          to={"https://forms.gle/fPxL99bGU8dGKSqYA"}
          className="hidden md:block btn-contributor px-5 py-1.5 rounded-lg cursor-pointer text-sm"
        >
          Contributor's
        </Link>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none cursor-pointer">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {isOpen && (
        <div className="md:hidden mobile-menu-glass mt-2 mx-2 rounded-2xl flex flex-col items-center gap-5 py-6 text-lg text-white shadow-2xl z-50">
          <NavLink to={"/"} onClick={toggleMenu} className={navStyles}>Home</NavLink>
          <NavLink to={"/posts"} onClick={toggleMenu} className={navStyles}>Posts</NavLink>
          <NavLink to={"/biography-allama-iqbal"} onClick={toggleMenu} className={navStyles}>Life of Allama Iqbal</NavLink>
          <Link
            target="_blank"
            to={"https://forms.gle/fPxL99bGU8dGKSqYA"}
            className="btn-contributor px-8 py-2 rounded-lg"
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