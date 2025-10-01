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

  const examData = [
    { 
      name: "CLAT", 
      color: "text-gray-600", 
      bgColor: "bg-gray-50",
      logo: clatLogo
    },
    { 
      name: "IPMAT", 
      color: "text-purple-600", 
      bgColor: "bg-purple-50",
      logo: ipmatLogo
    },
    { 
      name: "CUET", 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      logo: cuetLogo
    },
    { 
      name: "CBSE", 
      color: "text-red-600", 
      bgColor: "bg-red-50",
      logo: cbseLogo
    },
    { 
      name: "ICSE", 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      logo: icseLogo
    },
    { 
      name: "OLYMPIAD", 
      color: "text-yellow-600", 
      bgColor: "bg-yellow-50",
      logo: olympiadLogo
    },
  ];

  // Create infinite loop by duplicating array
  const infiniteExamData = [...examData, ...examData];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= examData.length - 1) {
          // Reset to 0 for seamless loop
          setTimeout(() => setCurrentIndex(0), 50);
          return prevIndex + 1;
        }
        return prevIndex + 1;
      });
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [examData.length]);

  return (
    <div className="relative -mt-20 mb-8 z-20">
      {/* Elevated Strip */}
      <div className="bg-white rounded-2xl shadow-xl mx-6 md:mx-12 lg:mx-24 border border-gray-100">
        <div className="px-8 py-6">
          {/* Stats Text */}
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
            Helping 20K+ students crack their exams
          </h3>

          {/* Animated Exam Cards Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 200}px)`,
                width: `${infiniteExamData.length * 200}px`
              }}
            >
              {infiniteExamData.map((exam, index) => (
                <div
                  key={`${exam.name}-${index}`}
                  className={`
                    flex items-center justify-center mx-3 px-6 py-3 rounded-full border-2 min-w-[180px]
                    ${exam.bgColor} ${exam.color} border-current
                    font-bold text-sm transition-all duration-300
                    hover:scale-105 cursor-pointer
                  `}
                >
                  {/* Logo Image */}
                  <img 
                    src={exam.logo} 
                    alt={`${exam.name} logo`}
                    className="w-6 h-6 mr-3 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'; // hide if not found
                    }}
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
