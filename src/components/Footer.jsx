import {
  Facebook,
  Instagram,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ posts }) => {
  return (
    <footer className=" p-4 md:p-2 ">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 justify-between gap-6">
        {/* Card 1: Branding & Image */}
        <div className="bg-[#B3B3B3] p-6 rounded-lg flex flex-col items-center text-center">
          <h2 className="text-3xl  mb-1">آئینہ اقبال</h2>
          <p className="text-lg font-medium mb-4">
            Reflection of Knowledge Towards Reality
          </p>
          <div className="w-full h-60 bg-[#545454] rounded-md overflow-hidden flex items-start justify-center">
            {/* Replace with actual <img> tag */}
            <img src="/cover.png" alt="" />
          </div>
        </div>

        {/* Card 2: Latest Posts (WP Fetch placeholder) */}
        <div className="bg-[#B3B3B3] p-6 rounded-lg flex flex-col items-center">
          <h2 className="text-3xl font-mono mb-6">Latest Posts</h2>
          <ul className="w-full space-y-3">
            {posts.slice(0, 6).map((post) => (
              <li key={post.id} className="text-center">
                <Link
                  to={`/post/${post.slug}`}
                  className="hover:underline text-lg block border-b border-gray-400 pb-1"
                >
                  {post.title.rendered}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Social & Navigation */}
        <div className="bg-[#B3B3B3] p-6 rounded-lg flex flex-col items-center">
          <p className="font-bold mb-4 uppercase tracking-wider">
            Social Media Pages
          </p>

          {/* Social Icons Row */}
          <div className="flex gap-3 mb-6">
            <a
              href="https://chat.whatsapp.com/DWUXnZYQ1ePI9k5eO6f4k1"
              target="_blank"
              className="w-16 bg-green-800 hover:bg-green-900 hover:border-2 hover:border-white cursor-pointer h-16 bg-[#373434] text-white rounded-lg text-2xl font-medium flex items-center justify-center px-1"
            >
              WA
            </a>
            <a
              href="https://facebook.com/aainaeiqbal"
              target="_blanks"
              className="w-16 cursor-pointer h-16 bg-blue-800 hover:bg-blue-900 hover:border-2 hover:border-white text-white rounded-lg text-sm flex items-center justify-center"
            >
              <Facebook size={30} />
            </a>
            <a
              href="https://instagram.com/aainaeiqbal"
              target="_blanks"
              className="w-16 cursor-pointer h-16 bg-[#373434] text-white rounded-lg text-sm flex items-center justify-center"
            >
              <Instagram size={30} />
            </a>
          </div>

          {/* Navigation Buttons Stack */}
          <div className="w-full flex flex-col gap-3">
            <button className="w-full py-3 cursor-pointer bg-[#373434] text-white rounded-lg hover:bg-black transition-colors">
              <Link to={"/posts"}>Posts</Link>
            </button>
            <button className="w-full py-3 cursor-pointer bg-[#373434] text-white rounded-lg hover:bg-black transition-colors">
              <Link to={"https://aainaeiqbal.co.in/life-of-dr-allama-iqbal/"}>
                Life of Allama Iqbal
              </Link>
            </button>
            <button className="w-full py-3 cursor-pointer bg-[#373434] text-white rounded-lg hover:bg-black transition-colors flex justify-center gap-2">
              <Link target="_blank" href="https://forms.gle/fPxL99bGU8dGKSqYA">
                Contributor's / <span>معاون</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
