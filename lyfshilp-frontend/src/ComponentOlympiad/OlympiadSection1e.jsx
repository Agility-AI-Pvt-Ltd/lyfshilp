import React from "react";

export default function OlympiadSection1e() {
  return (
    <section className="relative py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">

      <div className="max-w-7xl mx-auto w-full">

        {/* ===================== MAIN GRID ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ============== LEFT TEXT BLOCK ============== */}
          <div className="leading-tight space-y-8">

            {/* Main Heading */}
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 uppercase leading-snug">
                THE CHANGING LANDSCAPE <br />
                OF <span className="text-green-600 italic">EDUCATION</span>
              </h3>

              <p className="mt-3 font-semibold text-gray-900 text-sm sm:text-base bg-yellow-100 inline-block px-4 py-1 rounded">
                As School leaders, You face the challenge of bridging the gap between traditional academics and future skills.
              </p>
            </div>

            {/* NEP Card */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-base sm:text-lg mb-3">
                NEP 2020 & NCF 2023 require integration of:
              </p>

              <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-snug">
                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  Financial Literacy & Wealth Management
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  AI, Coding & Digital Competencies
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  21st Century Problem Solving & Critical Thinking
                </li>
                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  Business Communication & Negotiation Skills
                </li>
              </ul>
            </div>

            {/* Challenge */}
            <div className="bg-red-50 rounded-xl p-6 shadow-md border-l-4 border-red-500 leading-snug">
              <p className="font-bold text-gray-900 text-base sm:text-lg mb-1">The Challenge:</p>
              <p className="text-gray-700 text-sm sm:text-base">
                Implementing these subjects demands trained faculty, modern infrastructure, and
                additional academic time-resources already stretched thin.
              </p>
            </div>

            {/* Solution */}
            <div className="bg-green-50 rounded-xl p-6 shadow-md border-l-4 border-green-500 leading-snug">
              <p className="font-bold text-gray-900 text-base sm:text-lg mb-1">The Solution:</p>
              <p className="text-gray-700 text-sm sm:text-base">
                The FutureX Fellowship brings expert-led, ready-to-launch programs to your school, enabling
                NEP-compliant future-skilling with no extra administrative burden.
              </p>
            </div>

          </div>

          {/* ===================== RIGHT IMAGE BLOCK ===================== */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow */}
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute top-1/4 right-10 w-60 h-60 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>

            {/* Image */}
            <img
              src="/images/1.svg"
              alt="boy"
              className="relative z-10 w-80 sm:w-[28rem] lg:w-[34rem] object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </div>

      {/* Floating Circles */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-300 opacity-15 rounded-full blur-2xl"></div>

    </section>
  );
}
