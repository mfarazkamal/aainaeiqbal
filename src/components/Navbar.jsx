import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-around items-center p-2 bg-[#0f1115] text-white">
      <div>
        <h1 className="uppercase text-2xl font-bold cursor-pointer">Aaina e Iqbal</h1>
      </div>

      <nav className="flex gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/posts"}>Posts</Link>
        <Link to={"/lifeOfAllamaIqbal"}>Life of Allama Iqbal</Link>
        <Link to={"/about"}>About</Link>
      </nav>

      <button className="border bg-[#1F2430] text-white px-4 py-2 rounded-md cursor-pointer">Contribute</button>
    </div>
  );
}

export default Navbar;
