// src/components/Firstpart.jsx
import heroImg from "../assets/ipmatCimg/ipmat-hero.svg";
import bgpath from "../assets/ipmatCimg/bgpath.svg";
import percentimg from "../assets/ipmatCimg/percentimg.svg";
import cuetlogo from "../assets/logos/ipmatimg.svg";
import Caticonic from "../assets/cuetCimg/Caticonic.svg";

export default function Firstpart() {
  return (
    <section className="relative bg-white overflow-hidden py-16 md:py-20 px-6 md:px-12 lg:px-20">
      {/* Orange/Yellow Background Shape */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-[750px] h-[460px] z-0">
        <img
          src={bgpath}
          alt="Background Shape"
          className="w-full h-full object-contain opacity-90"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-6 text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            Crack{" "}
            <span className="inline-flex items-center border-2 border-green-600 bg-green-50 px-3 py-1 rounded-md">
              <span className="text-green-700 font-bold mr-2">IPMAT/JIPMAT</span>
              <img 
                src={cuetlogo} 
                alt="CUET Logo" 
                className="w-6 h-6" 
              />
            </span>
            <br />
            with Strategy, skills and smart Practice
          </h1>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
            Master Quantitative Aptitude, Logical Reasoning, and Verbal Ability through targeted practice, real exam simulations, and expert-guided learning for India’s top integrated management programs.
          </p>

          {/* Button and Rocket Stats side by side */}
          <div className="pt-4 flex items-center gap-5">
            {/* Learn More Button (opens in new tab) */}
            <a
              href="https://lyfshilpacademy.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-full shadow-lg transition-all duration-300 group"
            >
              Learn More
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>

            {/* Rocket + 2K Stats */}
            <div className="flex items-center bg-white rounded-xl shadow-lg px-4 py-2 border border-gray-100">
              <img 
                src={percentimg} 
                alt="Rocket Icon" 
                className="w-10 h-10 mr-2"
              />
              <div>
                <p className="font-bold text-gray-900 text-lg leading-tight">
                  80% students
                </p>
                <p className="text-xs text-gray-600 whitespace-nowrap">
                  Recorded improvement
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Students Image */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          <div className="relative">
            <img
              src={heroImg}
              alt="Two CUET students with books"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg relative z-20 drop-shadow-2xl"
            />
            <img
              src={Caticonic}
              alt="Decorative Icon"
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 md:w-12 animate-bounce z-30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
