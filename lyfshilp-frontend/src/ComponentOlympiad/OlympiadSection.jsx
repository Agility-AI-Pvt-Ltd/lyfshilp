// src/components/OlympiadSection.jsx
import studentsImage from "/students-group.svg";

export default function OlympiadSection() {
  const stats = [
    { icon: "📚", value: "9/10", label: "Improved Exam Readiness" },
    { icon: "💡", value: "82%", label: "Boosted Confidence & Problem-Solving" },
    { icon: "📈", value: "87%", label: "Reported Better Career Clarity" },
  ];

  return (
    <section className="bg-[#FFF8EE] py-14 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 md:gap-16">

          {/* ==== Left Content ==== */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug md:leading-tight mb-4">
              <span className="text-green-600">The International FutureX </span>
              <span className="text-gray-900">Fellowship</span>
            </h2>

            {/* Highlight Text */}
            <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm sm:text-lg font-medium shadow-md mb-4">
              Learn how real businesses are built directly from the founders who built them.
            </span>

            {/* Download Button */}
            <div className="mt-3">
              <a
                href="/International_FutureXFellowship.pdf"
                download
                className="inline-block px-3 py-1 bg-yellow-600 text-white text-lg font-medium rounded-md hover:bg-green-700 transition blink-stop-hover"
                style={{ animation: "blinkReal 2s infinite" }}
              >
                Download Brochure
              </a>
            </div>

            {/* Subheading */}
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 mt-6 max-w-xl mx-auto lg:mx-0">
              The International FutureX isn't just an exam it's a journey that conncts students with real-world mentors, hands-on learning experiences and opportunities to transform thier ideas into impact.
            </p>

            {/* Stats Section */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ==== Right Image ==== */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="absolute inset-0 hidden sm:block">
              <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M 150 0 L 400 0 L 400 400 L 0 400 Q 100 300 150 0 Z"
                  fill="#FDB913"
                  opacity="0.9"
                />
              </svg>
            </div>

            <div className="relative z-10 w-[85%] sm:w-[70%] md:w-[65%] lg:w-[80%] max-w-lg">
              <img
                src={studentsImage}
                alt="Happy students celebrating success"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
