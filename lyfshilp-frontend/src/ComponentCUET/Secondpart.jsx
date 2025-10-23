// src/components/WhyWorkWithUs.jsx
import waveBg from "../assets/cuetCimg/wave-bg.svg";
import {
  GraduationCap,
  Users,
  Award,
  Layers3,
} from "lucide-react"; // 🎯 Updated icons

export default function WhyWorkWithUs() {
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#FFF8EE]/80"></div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Why <span className="text-green-600">choose us?</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            You’ll join a passionate group of educators, entrepreneurs, and
            innovators who are reimagining how students learn and grow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* 1️⃣ CUET Syllabus */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Aligned with the CUET Syllabus
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Covers all CUET sections Language, Domain Subjects, and General
                Test ensuring conceptual clarity and analytical depth as per NTA
                guidelines.
              </p>
            </div>
          </div>

          {/* 2️⃣ Personalized Support */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Personalized Academic Support
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Get one-on-one guidance, doubt-clearing sessions, and mentorship
                tailored to your unique learning challenges.
              </p>
            </div>
          </div>

          {/* 3️⃣ Expert Faculty */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Expert Faculty Guidance
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Learn from subject specialists who simplify complex topics and
                help build effective test-taking strategies with accuracy.
              </p>
            </div>
          </div>

          {/* 4️⃣ Structured Learning */}
          <div className="bg-white shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-50 p-3 sm:p-4 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors duration-300">
              <Layers3 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Structured Learning Framework
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Classes follow a systematic schedule blending lectures, practice sessions,
                and performance evaluations for continuous academic progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
