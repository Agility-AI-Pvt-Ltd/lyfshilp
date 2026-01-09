import React from "react";

export default function OlympiadSection3() {
  return (
    <section className="relative py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ===================== LEFT IMAGE BLOCK ===================== */}
        <div className="relative flex justify-center lg:justify-start min-h-[450px]">

          {/* Soft Glows */}
          <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-300 opacity-25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-300 opacity-25 rounded-full blur-2xl"></div>

          {/* Illustration */}
          <img
            src="/images/4.svg"
            alt="mentor"
            className="relative z-10 w-72 sm:w-[26rem] lg:w-[30rem] object-contain drop-shadow-xl"
          />
        </div>

        {/* ===================== RIGHT TEXT BLOCK ===================== */}
        <div className="leading-tight space-y-8 max-w-xl">

          {/* Title */}
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 uppercase leading-snug">
              PEDAGOGY & <span className="text-green-600 italic">MENTORSHIP</span>
            </h3>

            <p className="mt-3 font-semibold text-gray-900 text-sm sm:text-base bg-yellow-100 inline-block px-4 py-1 rounded">
              Learning from Industry Leaders
            </p>

            <p className="text-gray-700 text-sm sm:text-base leading-snug mt-4">
              We go beyond textbooks, students are mentored by experts bringing real-world insights into the classroom.
            </p>
          </div>

          {/* Mentors Card */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-all">
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">Mentors Include:</h4>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-snug">
              {[
                "IIT & IIM Alumni",
                "Industry Experts & Startup Founders",
                "Former IAS Officers",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Gamified Learning */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-500 hover:shadow-lg transition-all">
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">
              Gamified Learning Elements:
            </h4>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-snug">
              <li className="flex gap-3">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2"></span>
                <span><strong>XP System:</strong> Points, Levels, Badges, Leaderboards</span>
              </li>

              <li className="flex gap-3 ">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-[0.50rem] flex-shrink-0"></span>
                <span><strong>Students learn business and tech:</strong> by building a live venture, managing finance, operations, marketing and sales with expert mentorship.</span>
              </li>

              <li className="flex gap-3">
                <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>Live Lectures by Industry Experts:</strong> Interactive sessions with founders and leaders</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Floating Decorations */}
      <div className="absolute top-12 right-12 w-28 h-28 bg-indigo-300 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-16 left-10 w-36 h-36 bg-pink-300 opacity-20 rounded-full blur-2xl"></div>

    </section>
  );
}
