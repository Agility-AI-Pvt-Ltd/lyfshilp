// src/components/ExamStats.jsx
import clatLogo from "../assets/logos/clatimg.svg";
import ipmatLogo from "../assets/logos/ipmatimg.svg";
import cuetLogo from "../assets/logos/cuetimg.svg";
import cbseLogo from "../assets/logos/cbseimg.svg";
import icseLogo from "../assets/logos/icseimg.svg";
import olympiadLogo from "../assets/logos/olympiad-logo.svg";

export default function ExamStats() {
  const examData = [
    { name: "CLAT", color: "text-gray-600", bgColor: "bg-gray-50", logo: clatLogo },
    { name: "IPMAT", color: "text-purple-600", bgColor: "bg-purple-50", logo: ipmatLogo },
    { name: "CUET", color: "text-green-600", bgColor: "bg-green-50", logo: cuetLogo },
    { name: "CBSE", color: "text-red-600", bgColor: "bg-red-50", logo: cbseLogo },
    { name: "ICSE", color: "text-blue-600", bgColor: "bg-blue-50", logo: icseLogo },
    { name: "OLYMPIAD", color: "text-yellow-600", bgColor: "bg-yellow-50", logo: olympiadLogo },
  ];

  return (
    <div className="relative -mt-2 md:-mt-10 mb-8 z-10">
      {/* Elevated Strip */}
      
      <div className="bg-white rounded-2xl shadow-xl mx-4 sm:mx-8 md:mx-12 lg:mx-24 border border-gray-100">
        <div className="px-4 sm:px-6 md:px-8 py-4">
          {/* Stats Text */}
          <h3 className="text-center text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Helping <span className="text-green-600 font-bold">20K+</span> students crack their exams
          </h3>

          {/* 🎞️ Continuous Scrolling Exam Logos */}
          <div className="overflow-hidden relative">
            <div className="flex animate-scrollRightToLeft hover:[animation-play-state:paused] space-x-6 w-max">
              {[...Array(2)].map((_, loopIndex) => (
                <div key={loopIndex} className="flex space-x-6">
                  {examData.map((exam, i) => (
                    <div
                      key={`${exam.name}-${loopIndex}-${i}`}
                      className={`flex items-center justify-center px-5 py-2 sm:px-6 sm:py-3 rounded-full border-2 border-current 
                        ${exam.bgColor} ${exam.color} font-bold text-xs sm:text-sm md:text-base transition-transform duration-300 
                        hover:scale-105 cursor-pointer whitespace-nowrap`}
                    >
                      <img
                        src={exam.logo}
                        alt={`${exam.name} logo`}
                        className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 object-contain"
                      />
                      {exam.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
