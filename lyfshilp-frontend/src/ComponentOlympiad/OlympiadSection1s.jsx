import React from "react";

export default function OlympiadSection1s() {
  return (
    <section className="relative py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">

      <div className="max-w-7xl mx-auto w-full">

        {/* GRID (IMAGE LEFT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* ===================== IMAGE BLOCK (LEFT) ===================== */}
          <div className="relative flex items-center justify-center min-h-full h-full">

            {/* Glow 1 */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-200 rounded-full opacity-30 blur-3xl"></div>

            {/* Glow 2 */}
            <div className="absolute bottom-1/4 left-10 w-60 h-60 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>

            {/* Main Illustration */}
            <img
              src="/images/2.svg"
              alt="student"
              className="relative z-10 w-full max-w-[34rem] object-contain drop-shadow-xl"
            />
          </div>

          {/* ===================== TEXT BLOCK (RIGHT) ===================== */}
          <div className="leading-tight space-y-8 flex flex-col justify-center">

            {/* Heading */}
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 uppercase leading-snug">
                WORLD-CLASS LEARNING, <br />
                <span className="text-green-600 italic">DELIVERED LOCALLY</span>
              </h3>

              <p className="mt-3 font-semibold text-gray-900 text-sm sm:text-base bg-yellow-100 px-4 py-1 inline-block rounded">
                Curriculum Benchmarked with Ivy League Standards
              </p>

              <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed max-w-lg">
Students don’tjustlearn about business -they build one.
Each participantlearn business,tech and communication
by building a live venture, managing finance, operations,
marketing, sales and stakeholder communication.
              </p>
            </div>

            {/* Program Structure Card */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-all">
              <p className="font-bold text-gray-900 text-base sm:text-lg mb-3">
                Program Structure:
              </p>

              <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-snug">

                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                  <span><strong>Duration:</strong> 6 Months</span>
                </li>

                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                  <span><strong>Target Group:</strong> Classes 6–9</span>
                </li>

                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                  <span>
                    <strong>Methodology:</strong>  Student builds a working startup
alongside learning business concepts (NEP Section 4.4)
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                  <span>
                    Integrates MIT Sloan School of Management principles with 
                    FutureX's experiential learning.
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* FLOATING DECORATIONS */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-300 opacity-15 rounded-full blur-2xl"></div>

    </section>
  );
}
