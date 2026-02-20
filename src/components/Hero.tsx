import React from "react";
import { ShieldCheck, HeartPulse, PhoneCall } from "lucide-react";

interface HeroProps {
  onOpenChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section className="relative bg-white min-h-screen flex items-center overflow-hidden">
      {/* Floating shapes */}
      {/* <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-300 rounded-full opacity-20 animate-pulse"></div> */}

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center z-10">

        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Your AI Companion for <span className="text-pink-700">Pregnancy & Newborn Care</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600">
            Adarah helps mothers understand symptoms and know when to seek urgent care.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-pink-700 w-6 h-6" />
              <span className="font-medium text-gray-700">Emergency red-flag detection</span>
            </div>
            <div className="flex items-center gap-3">
              <HeartPulse className="text-pink-500 w-6 h-6" />
              <span className="font-medium text-gray-700">Built for Kenyan families</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="text-pink-700 w-6 h-6" />
              <span className="font-medium text-gray-700">Encourages hospital visits</span>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={onOpenChat}
              className="bg-gradient-to-r from-pink-600 to-pink-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Talk to Adarah
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img
              src="/AdarahCare.png"
              className="w-full h-auto object-cover"
              alt="Adarah Care"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
