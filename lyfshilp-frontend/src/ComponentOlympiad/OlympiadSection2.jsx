import React from "react";

export default function OlympiadSection2() {
  return (
    <section className="relative py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT BLOCK — BOOKLET STYLE */}
        <div className="leading-tight">

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 uppercase leading-snug">
            THE 4 PILLARS OF THE <br /> <span className="text-green-600 italic">CURRICULUM</span>
          </h3>

          <p className="mt-3 font-semibold text-gray-900 text-sm sm:text-base bg-yellow-100 inline-block px-4 py-1 rounded">
            A Multidisciplinary Approach (NCF 2023 Aligned)
          </p>

          <div className="mt-8 space-y-6">

            {/* Pillar 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                AI & Future Tech
              </h4>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-snug">
                <strong>Focus:</strong> Computational Thinking & Digital Competencies <br />
                <strong>Alignment:</strong> National Digital Education Mission, Skill India <br />
                <strong>Outcome:</strong> Tech-literate students ready for the AI era
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Finance & Wealth Skills
              </h4>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-snug">
                <strong>Focus:</strong> Financial literacy & wealth creation basics <br />
                <strong>Alignment:</strong> NEP Financial Literacy Mandates <br />
                <strong>Outcome:</strong> Financially aware young citizens
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Digital Marketing & Branding
              </h4>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-snug">
                <strong>Focus:</strong> Design Thinking, Communication & Digital Citizenship <br />
                <strong>Alignment:</strong> Socio-Emotional Learning (NCF) <br />
                <strong>Outcome:</strong> Confident communicators & strategic thinkers
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-3">
                <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Business Communication
              </h4>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-snug">
                <strong>Focus:</strong>  Negotiation, influence, conflict resolution, storytelling, networking and personal branding <br />
                <strong>Alignment:</strong> Entrepreneurial soft skills aligned with NEP, Skill India <br />
                <strong>Outcome:</strong>Persuasive negotiators, storytellers, networkers, brand-builders
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE BLOCK — MATCHED STYLE */}
        <div className="relative flex justify-center lg:justify-end items-center">

          {/* Soft Glow */}
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full opacity-30 blur-2xl"></div>

          {/* Character Illustration */}
          <img
            src="/images/10.svg"
            alt="Laddder"
            className="relative z-10 w-72 sm:w-[30rem] lg:w-[36rem] object-contain drop-shadow-xl"
          />
        </div>

      </div>

      {/* Floating Decorations */}
      <div className="absolute top-16 right-16 w-24 h-24 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-12 w-32 h-32 bg-orange-300 opacity-20 rounded-full blur-2xl"></div>

    </section>
  );
}
