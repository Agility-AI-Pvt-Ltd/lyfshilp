// src/components/Firstpart.jsx
import heroImg from "../assets/CuetCimg/cuet-hero.svg";
import bgpath from "../assets/CuetCimg/bgpath.svg";
import rocket from "../assets/CuetCimg/rocketing.svg";
import cuetlogo from "../assets/logos/cuetimg.svg";
import Caticonic from "../assets/CuetCimg/Caticonic.svg";

export default function Firstpart() {
  return (
    <section className="relative bg-white overflow-hidden pt-20 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      
      {/* Orange/Yellow Background Shape */}
      <div className="hidden md:block absolute top-1/2 right-5 md:right-10 transform -translate-y-1/2 w-[500px] md:w-[600px] lg:w-[750px] h-[300px] md:h-[380px] lg:h-[460px] z-0">
        <img
          src={bgpath}
          alt="Background Shape"
          className="w-full h-full object-contain opacity-90"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            Score Higher in{" "}
            <span className="inline-flex items-center border-2 border-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-md">
              <span className="text-green-700 font-bold mr-1.5 sm:mr-2">CUET</span>
              <img 
                src={cuetlogo} 
                alt="CUET Logo" 
                className="w-5 h-5 sm:w-6 sm:h-6" 
              />
            </span>
            <br />
            with Guided Practice
          </h1>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Custom study plans tailored to your chosen subjects, combined with
            full-length and sectional mock tests that mirror the latest CUET
            pattern. Get detailed performance insights and expert tips.
          </p>

          {/* Button and Rocket Stats */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-5">
            
            {/* Learn More Button */}
            <a
              href="https://lyfshilpacademy.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-lg transition-all duration-300 group text-sm sm:text-base"
            >
              Learn More
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>

            {/* Rocket + 2K Stats */}
            <div className="flex items-center bg-white rounded-xl shadow-lg px-3 sm:px-4 py-2 border border-gray-100">
              <img 
                src={rocket} 
                alt="Rocket Icon" 
                className="w-8 h-8 sm:w-10 sm:h-10 mr-2 flex-shrink-0"
              />
              <div>
                <p className="font-bold text-gray-900 text-base sm:text-lg leading-tight">
                  2K+
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">
                  Selections in top universities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Students Image */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center mb-2">
          <div className="relative max-w-[280px] sm:max-w-xs md:max-w-md lg:max-w-lg">
            <img
              src={heroImg}
              alt="Two CUET students with books"
              className="w-full h-auto relative z-20 drop-shadow-2xl"
            />
            <img
              src={Caticonic}
              alt="Decorative Icon"
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 animate-bounce z-30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}