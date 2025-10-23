// src/components/OlympiadSection.jsx
import studentsImage from "../assets/Olympiadimg/students-group.svg";

export default function OlympiadSection() {
  const stats = [
    { icon: "📚", value: "9/10", label: "Improved Exam Readiness" },
    { icon: "💡", value: "82%", label: "Boosted Confidence & Problem-Solving" },
    { icon: "📈", value: "87%", label: "Reported Better Career Clarity" },
  ];

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-14">
          
          {/* ==== Left Content ==== */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 order-2 lg:order-1">
            
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="text-green-600">Olympiads</span>
              <span className="text-gray-900"> – where skill meets </span>
              <span className="inline-block bg-green-600 text-white px-3 py-1 rounded mt-2 sm:mt-0">
                challenges
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 px-3 sm:px-0 max-w-md sm:max-w-lg md:max-w-xl mx-auto lg:mx-0">
              Test your knowledge, sharpen your skills, and compete with the best through 
              our engaging, real-world Olympiads.
            </p>

            {/* Stats Section */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ==== Right Image ==== */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            {/* Yellow Background Shape */}
            <div className="absolute top-0 right-0 w-full h-full hidden sm:block">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M 150 0 L 400 0 L 400 400 L 0 400 Q 100 300 150 0 Z"
                  fill="#FDB913"
                  opacity="0.9"
                />
              </svg>
            </div>

            {/* Students Image */}
            <div className="relative z-10 w-[80%] sm:w-[70%] md:w-[65%] lg:w-[85%] max-w-md sm:max-w-lg">
              <img
                src={studentsImage}
                alt="Happy students celebrating success"
                className="w-full h-auto object-contain drop-shadow-2xl"
                onError={(e) => {
                  e.target.outerHTML = `
                    <div class='w-full h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl'>
                      <div class='text-center text-white'>
                        <div class='text-6xl sm:text-7xl mb-4'>🎓👥</div>
                        <p class='text-lg sm:text-xl font-bold'>Students Group</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
