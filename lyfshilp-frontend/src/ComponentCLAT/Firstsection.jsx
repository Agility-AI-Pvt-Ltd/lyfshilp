// src/components/Firstsection.jsx
import clatHeroImg from "../assets/clatCimg/clat-hero.svg";
import bgpath from "../assets/clatCimg/bg-path.svg";
import clatLogo from "../assets/logos/clatimg.svg";
import successIcon from "../assets/clatCimg/success-star.svg";

export default function Firstsection() {
  return (
    <section className="relative bg-white overflow-hidden py-14 md:py-20 px-6 md:px-12 lg:px-20">
      {/* Orange Background Shape */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-[750px] h-[460px] z-0">
        <img
          src={bgpath}
          alt="Background Shape"
          className="w-full h-full object-contain opacity-90"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 relative z-10">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 space-y-6 text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            Master{" "}
            <span className="inline-flex items-center border-2 border-green-600 bg-green-50 px-3 py-1 rounded-md">
              <span className="text-green-700 font-bold mr-2">CLAT</span>
              <img src={clatLogo} alt="CLAT Logo" className="w-7 h-7" />
            </span>{" "}
            with Precision & Practice
          </h1>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
            Build exam-ready skills through daily drills, curated reading sets,
            and full-length mocks that mirror the real CLAT experience, insights and expert mentor feedback.
          </p>

          {/* Button + Success Badge */}
          <div className="pt-4 flex items-center gap-6 flex-wrap">
            {/* Learn More Button (linked) */}
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

            {/* Success Rate Box */}
            <div className="flex items-center bg-white rounded-xl shadow-md px-6 py-3 border border-gray-100">
              <img
                src={successIcon}
                alt="Success Icon"
                className="w-14 h-14 mr-3 object-contain"
              />
              <div>
                <p className="font-bold text-gray-900 text-base md:text-lg leading-tight">
                  80% approx.
                </p>
                <p className="text-xs text-gray-600">Success Rate in CLAT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Hero Image */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          <img
            src={clatHeroImg}
            alt="CLAT students"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg relative z-20 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
