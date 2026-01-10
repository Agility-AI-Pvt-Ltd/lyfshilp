import React from "react";

export default function OlympiadSection1a() {
  return (
    <section className="relative py-10 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">
      {/* ⬆️ py-16 → py-10 */}

      <div className="max-w-7xl mx-auto w-full">

        {/* ===================== TITLE ===================== */}
        <div className="text-center mb-6">
          {/* ⬆️ mb-12 → mb-6 */}

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide text-green-600 leading-tight drop-shadow-md"
            style={{
              WebkitTextStroke: "3px white",
              paintOrder: "stroke fill",
            }}
          >
            INTERNATIONAL <br />
            <span className="inline-block mr-3">FUTUREX</span>
            <span
              className="inline-block text-gray-900"
              style={{
                WebkitTextStroke: "3px white",
                paintOrder: "stroke fill",
              }}
            >
              FELLOWSHIP
            </span>
          </h2>

          <p className="mt-3 bg-green-600 text-white font-semibold py-2 px-5 text-sm sm:text-base lg:text-lg tracking-wide rounded-md inline-block shadow-md">
            {/* ⬆️ mt-5 → mt-3 */}
            INTEGRATES MIT SLOAN SCHOOL OF MANAGEMENT PRINCIPLES
          </p>
        </div>
      </div>

      {/* Floating Circles (optional: slightly tighter positioning) */}
      <div className="absolute top-12 right-16 w-28 h-28 bg-yellow-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-12 left-10 w-36 h-36 bg-orange-300 opacity-15 rounded-full blur-2xl"></div>
    </section>
  );
}
