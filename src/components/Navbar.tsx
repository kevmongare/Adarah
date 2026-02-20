import { useState } from "react";
import Menu from "../data/Navbar";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const middleIndex = Math.ceil(Menu.length / 2);
  const leftMenu = Menu.slice(0, middleIndex);
  const rightMenu = Menu.slice(middleIndex);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-t from-black via-pink-800 to-pink-700 backdrop-blur-md shadow-md transition-all duration-300">
      
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* Left Menu */}
        <ul className="flex space-x-8">
          {leftMenu.map((item, index) => (
            <li
              key={index}
              className="text-gray-100 font-medium hover:text-pink-500 transition duration-300 cursor-pointer relative"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Center Logo */}
        <div className="mx-12 flex items-center">
          <img
            src="/AdarahLogo.png"
            alt="Adarah Logo"
            className="h-24 w-auto rounded-full bg-white shadow-lg"
          />
        </div>

        {/* Right Menu */}
        <ul className="flex space-x-8">
          {rightMenu.map((item, index) => (
            <li
              key={index}
              className="text-gray-100 font-medium hover:text-pink-500 transition duration-300 cursor-pointer relative"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex justify-between items-center px-6 py-4">
        <img
          src="/AdarahLogo.png"
          alt="Adarah Logo"
          className="h-16 w-auto rounded-full shadow-md bg-white"
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-100 hover:text-pink-500 transition"
        >
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg px-6 py-4 space-y-4 text-center rounded-b-lg">
          {Menu.map((item, index) => (
            <div
              key={index}
              className="text-gray-800 text-lg font-medium hover:text-pink-500 transition duration-300 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
