import React from "react";

export default function OlympiadSection5() {
  return (
    <section className="relative py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ===================== LEFT IMAGE BLOCK ===================== */}
        <div className="relative flex justify-center lg:justify-start min-h-[480px]">

          {/* Glow Circles */}
          <div className="absolute top-16 left-10 w-72 h-72 bg-green-200 opacity-30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-emerald-200 opacity-25 blur-2xl rounded-full"></div>

          {/* Illustration */}
          <img
            src="/images/6.svg"
            alt="partner"
            className="relative z-10 w-72 sm:w-[26rem] lg:w-[30rem] object-contain drop-shadow-xl"
          />
        </div>

        {/* ===================== RIGHT TEXT BLOCK ===================== */}
        <div className="leading-tight space-y-8 max-w-xl relative z-10">

          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase leading-snug">
              Why Partner With <span className="text-green-600 italic">FutureX?</span>
            </h3>

            <p className="mt-3 font-semibold text-sm sm:text-base bg-yellow-100 inline-block px-4 py-1 rounded">
              Zero Load. Maximum Impact.
            </p>
          </div>

          {/* Benefits Card */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all">

            <ul className="space-y-6 text-gray-700 text-sm sm:text-base leading-snug">

              {/* Benefit Item */}
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900">Zero Administrative Load</strong>
                  <p className="mt-1 text-sm leading-snug">
                    We manage sessions, content, assessments and communication.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900">Enhance School Reputation</strong>
                  <p className="mt-1 text-sm leading-snug">
                    Recognition as a certified “FutureX Partner School”.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900">Co-Branded Certificates</strong>
                  <p className="mt-1 text-sm leading-snug">
                    Each student certificate carries your school's name.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <div>
                  <strong className="text-gray-900">Seamless Implementation</strong>
                  <p className="mt-1 text-sm leading-snug">
                    Dedicated school co-ordinator provided.
                  </p>
                </div>
              </li>

            </ul>

          </div>
        </div>

      </div>

      {/* Decorative Floating Circles */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-green-300 opacity-20 blur-xl rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-emerald-300 opacity-20 blur-2xl rounded-full"></div>

    </section>
  );
}
