import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-around items-center p-2 mb-4 bg-[#0f1115] text-white">
      <div>
        <Link to={"/"}>
          <h1 className="uppercase tracking-wider text-3xl font-bold cursor-pointer">
            Aaina e Iqbal
          </h1>
        </Link>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex gap-8 text-2xl">
        <Link to={"/"}>Home</Link>
        <Link to={"/posts"}>Posts</Link>
        <Link to={"/lifeOfAllamaIqbal"}>Life of Allama Iqbal</Link>
        <Link to={"/about"}>About</Link>
      </nav>

      <button className="hidden text-xl md:block border bg-[#1F2430] text-white px-6 py-2 rounded-md cursor-pointer">
        <a target="_blank" href="https://forms.gle/fPxL99bGU8dGKSqYA">Contribute</a>
      </button>

      {/* MOBILE NAV */}
    </div>
  );
}

export default Navbar;
