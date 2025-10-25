// src/components/ExamStats.jsx
import { useState, useEffect } from "react";
import clatLogo from "../assets/logos/clatimg.svg";
import ipmatLogo from "../assets/logos/ipmatimg.svg";
import cuetLogo from "../assets/logos/cuetimg.svg";
import cbseLogo from "../assets/logos/cbseimg.svg";
import icseLogo from "../assets/logos/icseimg.svg";
import olympiadLogo from "../assets/logos/olympiad-logo.svg";

export default function ExamStats() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(160); // responsive width

  const examData = [
    { name: "CLAT", color: "text-gray-600", bgColor: "bg-gray-50", logo: clatLogo },
    { name: "IPMAT", color: "text-purple-600", bgColor: "bg-purple-50", logo: ipmatLogo },
    { name: "CUET", color: "text-green-600", bgColor: "bg-green-50", logo: cuetLogo },
    { name: "CBSE", color: "text-red-600", bgColor: "bg-red-50", logo: cbseLogo },
    { name: "ICSE", color: "text-blue-600", bgColor: "bg-blue-50", logo: icseLogo },
    { name: "OLYMPIAD", color: "text-yellow-600", bgColor: "bg-yellow-50", logo: olympiadLogo },
  ];

  const infiniteExamData = [...examData, ...examData];

  // ⏱️ Auto-slide every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % examData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [examData.length]);

  // 📱 Adjust width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setCardWidth(130);  // small phones
      else if (window.innerWidth < 768) setCardWidth(150); // tablets
      else setCardWidth(200); // desktops
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative -mt-6 md:-mt-10 mb-8 z-10">
      {/* Elevated Strip */}
      <div className="bg-white rounded-2xl shadow-xl mx-4 sm:mx-8 md:mx-12 lg:mx-24 border border-gray-100">
        <div className="px-4 sm:px-6 md:px-8 py-6">
          {/* Stats Text */}
          <h3 className="text-center text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-6">
            Helping <span className="text-green-600 font-bold">20K+</span> students crack their exams
          </h3>

          {/* Animated Exam Cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * cardWidth}px)`,
                width: `${infiniteExamData.length * cardWidth}px`,
              }}
            >
              {infiniteExamData.map((exam, index) => (
                <div
                  key={`${exam.name}-${index}`}
                  className={`flex items-center justify-center mx-2 sm:mx-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 min-w-[${cardWidth}px]
                    ${exam.bgColor} ${exam.color} border-current
                    font-bold text-xs sm:text-sm md:text-base transition-all duration-300
                    hover:scale-105 cursor-pointer whitespace-nowrap
                  `}
                >
                  <img
                    src={exam.logo}
                    alt={`${exam.name} logo`}
                    className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 object-contain"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  {exam.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
