// src/components/Secondsection.jsx
import waveBg from "../assets/CuetCimg/wave-bg.svg";
import { Layers, BarChart2, BookOpen, Users } from "lucide-react";

export default function Secondsection() {
  return (
    <section
      className="relative bg-[#FFF8EE] py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundImage: `url(${waveBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Soft Overlay for readability */}
      <div className="absolute inset-0 bg-[#FFF8EE]/85"></div>

      <div className="relative z-10">
        {/* Heading Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Why <span className="text-green-600">choose us?</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Built for aspirants aiming to ace CLAT and AILET, this program
            combines structured preparation, expert mentorship, and smart
            analytics to help you achieve your dream law school.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* 1️⃣ Research-Based Study Material */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Research-Based Study Material
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Updated resources aligned with the latest CLAT trends and exam
                patterns.
              </p>
            </div>
          </div>

          {/* 2️⃣ Holistic Legal Foundation */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Holistic Legal Foundation
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Build strong legal reasoning, critical thinking, and academic
                discipline for success in law school and beyond.
              </p>
            </div>
          </div>

          {/* 3️⃣ Comprehensive Curriculum */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Comprehensive Curriculum
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Structured to cover every section of CLAT with conceptual depth
                and analytical clarity.
              </p>
            </div>
          </div>

          {/* 4️⃣ Expert Faculty */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Expert Faculty
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Led by experienced legal educators who provide focused academic
                mentorship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
