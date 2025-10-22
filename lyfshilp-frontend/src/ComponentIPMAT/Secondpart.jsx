import waveBg from "../assets/cuetCimg/wave-bg.svg"; // 🟢 change folder if needed
import { Brain, BarChart3, FileText, Users } from "lucide-react";

export default function Secondpart() {
  return (
    <section
      className="relative bg-[#FFF8EE] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundImage: `url(${waveBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[#FFF8EE]/80"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why <span className="text-green-600">choose us?</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Join India’s leading mentors for IPMAT & JIPMAT preparation and take the first step toward your dream IIM.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Card 1 - Concept Clarity */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:-translate-y-1 transition-all duration-300">
            <div className="bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Strong Concept Foundation
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Master Quantitative Aptitude, Verbal Ability, and Logical Reasoning
                with topic-wise lectures, shortcuts, and concept boosters.
              </p>
            </div>
          </div>

          {/* Card 2 - Smart Analytics */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:-translate-y-1 transition-all duration-300">
            <div className="bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                AI-Powered Test Analytics
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Attempt real IPMAT-level mocks and get instant performance analysis
                highlighting accuracy, time, and improvement areas.
              </p>
            </div>
          </div>

          {/* Card 3 - PYQs & Strategy */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:-translate-y-1 transition-all duration-300">
            <div className="bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Previous Year Papers & Strategy Sessions
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Solve real IPMAT/JIPMAT PYQs with detailed solutions and learn
                toppers’ strategies through live workshops.
              </p>
            </div>
          </div>

          {/* Card 4 - Interview Prep */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:-translate-y-1 transition-all duration-300">
            <div className="bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                WAT & PI Mentorship
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Prepare for Personal Interviews and Written Ability Tests with
                expert mentors who guide you from mock rounds to final selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
