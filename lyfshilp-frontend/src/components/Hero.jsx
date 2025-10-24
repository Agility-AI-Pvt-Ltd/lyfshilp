// src/components/Hero.jsx
import { Link } from "react-router-dom";
import heroImg from "../assets/hero-students.svg"; // Students image
import copoweredLogo from "../assets/copowered.png"; // Co-powered logo

export default function Hero() {
  return (
    <section className="bg-white pt-12  sm:pt-24 md:pt-6 pb-8 font-sans relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8 md:gap-10 max-w-7xl">
        
        {/* Left Content */}
        <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left order-2 md:order-1">
          
          {/* Co-powered */}
          <div className="flex justify-center md:justify-start items-center mb-3 sm:mb-4 space-x-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full border">
              Co-Powered by:
            </span>
            <a
              href="https://agilityai.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black rounded-full p-1 hover:scale-110 transition-transform"
            >
              <img src={copoweredLogo} alt="Co Powered" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            </a>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-3 sm:mb-4">
            Mentorship,{" "}
            <span className="bg-green-500 text-white px-2 py-0.5 rounded inline-block transform -rotate-1 text-xl sm:text-2xl md:text-3xl lg:text-5xl whitespace-nowrap">
              Smarter
            </span>
            <br />
            <span className="text-gray-900">Exam Prep & Skills for</span>
            <br />
            <span
              className="text-green-600 font-bold italic"
              style={{ fontFamily: "cursive" }}
            >
              Future Ready You!
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 text-center md:text-left max-w-lg mx-auto md:mx-0">
            We guide students through every stage of learning from cracking
            competitive exams like <strong>CUET, IPMAT & CLAT</strong> to career
            profiling, gamified skill-building with EduManiax and
            capacity-building workshops for schools and colleges.
          </p>

          {/* CTA */}
          <div className="flex justify-center md:justify-start">
          <Link
          to="/exam-prep"
          className="inline-flex items-center bg-green-600 text-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 group text-sm sm:text-base"
          >
          Start Learning
          <span className="ml-2 text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300">
           →
          </span>
          </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end items-center relative order-1 md:order-2">
          <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-none">
            <img
              src={heroImg}
              alt="Boy and girl students with backpacks and books giving thumbs up"
              className="w-full h-auto md:h-[500px] lg:h-[580px] xl:h-[650px] object-contain drop-shadow-xl transition duration-500 hover:scale-105"
            />
            
            {/* Decorative Background */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-green-100/30 via-transparent to-blue-100/30 rounded-full blur-3xl"></div>
          </div>
        </div>

      </div>
    </section>
  );
}