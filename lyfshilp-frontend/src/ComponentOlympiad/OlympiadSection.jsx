// src/components/OlympiadSection.jsx
import studentsImage from "../assets/Olympiadimg/students-group.svg";

export default function OlympiadSection() {
  const stats = [
    {
      icon: "📚",
      value: "9/10",
      label: "Improved Exam Readiness"
    },
    {
      icon: "💡",
      value: "82%",
      label: "Boosted Confidence & Problem-Solving"
    },
    {
      icon: "📈",
      value: "87%",
      label: "Reported Better Career Clarity"
    }
  ];

  return (
    <section className="bg-white py-4 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* Left Content */}
          <div className="max-w-xl">
   <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
  <span className="text-green-600">Olympiads</span>
  <span className="text-gray-900"> - where skill meets </span>
  
  <span className="inline-block bg-green-600 text-white px-3 py-1 rounded">
    challenges
  </span>
</h2>

<p className="text-gray-600 text-lg leading-relaxed mb-8">
  Test your knowledge, sharpen your skills, and compete with the best through 
  our engaging, real-world Olympiads.
</p>


            {/* Search Box */}
           {/* <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search the olympiad"
                className="w-full px-6 py-4 pr-14 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none text-gray-700 placeholder-gray-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            */}

            {/* Statistics */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Yellow Background Shape */}
            <div className="absolute top-0 right-0 w-full h-full">
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
            <div className="relative z-10">
              <img
                src={studentsImage}
                alt="Happy students celebrating success"
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.outerHTML = `
                    <div class="w-full max-w-lg h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                      <div class="text-center text-white">
                        <div class="text-8xl mb-4">🎓👥</div>
                        <p class="text-xl font-bold">Students Group</p>
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