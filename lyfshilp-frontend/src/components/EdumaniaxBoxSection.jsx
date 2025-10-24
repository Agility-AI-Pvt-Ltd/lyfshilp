// src/components/EdumaniaxBox.jsx
import { useState, useEffect } from "react";

import StepLogo1 from "../assets/edumaniaxbox/logo1.svg";
import StepLogo2 from "../assets/edumaniaxbox/logo2.svg";
import StepLogo3 from "../assets/edumaniaxbox/logo3.svg";
import StepLogo4 from "../assets/edumaniaxbox/logo4.svg";
import MainCharacter from "../assets/edumaniaxbox/boy-character.svg";

export default function EdumaniaxBoxSection() {
  const [showLogos, setShowLogos] = useState(true);

  const popOutLogos = [
    { src: StepLogo1, alt: "Education Logo 1", position: "top-10 left-10" },
    { src: StepLogo2, alt: "Education Logo 2", position: "top-16 right-12" },
    { src: StepLogo3, alt: "Education Logo 3", position: "bottom-20 left-6" },
    { src: StepLogo4, alt: "Education Logo 4", position: "bottom-12 right-10" },
  ];

  // Toggle all logos together
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogos((prev) => !prev);
    }, 2000); // every 2 seconds all logos fade in/out
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ backgroundColor: "#1DB954" }} // ✅ Spotify Green
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Faded Circle (top-right) */}
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-white/10"></div>

        {/* Cube Grid (left side) */}
        <div className="absolute top-32 left-12 grid grid-cols-2 gap-4 opacity-20">
          <div className="w-20 h-20 bg-white/20 rounded-lg"></div>
          <div className="w-20 h-20 bg-white/20 rounded-lg"></div>
          <div className="w-20 h-20 bg-white/20 rounded-lg"></div>
          <div className="w-20 h-20 bg-white/20 rounded-lg"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Left Content */}
        <div className="text-white">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Edumaniax - Learning
            <br />
            Meets Gaming!
          </h2>

          <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-lg">
            Skill-based courses in AI, Finance, Law, Communication &amp;
            Entrepreneurship made fun with gamified learning.
          </p>

          {/* ✅ Updated Button with link */}
          <a
            href="https://edumaniax.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:scale-105 transition duration-300 group">
              Start Learning
              <span className="ml-3 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </a>
        </div>

        {/* Right Side - Character with All Logos */}
        <div className="relative flex justify-center items-center h-96">
          {/* Logos behind boy */}
          <div className="absolute inset-0 z-10">
            {popOutLogos.map((logo, index) => (
              <div
                key={index}
                className={`absolute ${logo.position} transition-opacity duration-700`}
                style={{
                  opacity: showLogos ? 1 : 0,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-28 h-28 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Boy on top */}
          <div className="relative z-20">
            <img
              src={MainCharacter}
              alt="Edumaniax Learning Character holding laptop"
              className="w-72 h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
