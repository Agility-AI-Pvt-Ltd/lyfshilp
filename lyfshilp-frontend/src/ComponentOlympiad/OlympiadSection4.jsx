import React from "react";

export default function OlympiadSection4() {
  return (
    <section className="relative py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ===================== LEFT TEXT BLOCK ===================== */}
        <div className="leading-tight space-y-8 max-w-xl relative z-10">

          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase leading-snug">
              Assessment & <span className="text-green-600 italic">Rewards</span>
            </h3>

            <p className="mt-3 font-semibold text-gray-900 text-sm sm:text-base bg-yellow-100 inline-block px-4 py-1 rounded">
              Measuring Impact Through Rigorous Assessment
            </p>
          </div>

          {/* Evaluation Framework Card */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all">
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">
              Evaluation Framework
            </h4>

            <p className="text-gray-700 text-sm sm:text-base mb-2 leading-snug">
              <strong>Total:</strong> 100 Marks
            </p>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-snug">
              {[
                "Weekly Quizzes – 15%",
                "Case Analysis – 25%",
                "Venture Performance – 30%",
                "Final Pitch(Demo Day) – 30%",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Rewards Card */}
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-all">
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">
              Rewards & Recognition
            </h4>

            <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-snug">
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 text-xl">🥇</span>
                <span><strong>1st Prize:</strong> ₹75,000</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 text-xl">🥈</span>
                <span><strong>2nd Prize:</strong> ₹50,000</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 text-xl">🥉</span>
                <span><strong>3rd Prize:</strong> ₹25,000</span>
              </li>
            </ul>
          </div>

          {/* Elite Opportunities Card */}
{/* Elite Opportunities Card */}
<div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-all">
  <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-3">
    Elite Opportunities
  </h4>

  <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-snug">
    <li className="flex gap-3">
      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
      <span>
        <strong>Top 25 All-India Rankers:</strong> Internship opportunities with partner startups.
      </span>
    </li>
    <li className="flex gap-3">
      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
      <span>
        <strong>Top 3%:</strong> Lifetime mentorship through The International FutureX Fellows Cohort.
      </span>
    </li>
    <li className="flex gap-3">
      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
      <span>
        <strong>Guided incubation and mentorship:</strong> to help students evolve into entrepreneurs and solopreneurs.
      </span>
    </li>
  </ul>
</div>

        </div>

        {/* ===================== RIGHT IMAGE BLOCK ===================== */}
        <div className="relative flex justify-center lg:justify-end min-h-[480px]">

          {/* Glow Elements */}
          <div className="absolute top-24 right-10 w-72 h-72 bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

          {/* Image */}
          <img
            src="/images/5.svg"
            alt="girl"
            className="relative z-10 w-72 sm:w-[26rem] lg:w-[32rem] object-contain drop-shadow-xl"
          />
        </div>

      </div>

      {/* Floating Deco */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-pink-300 opacity-20 blur-2xl rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-yellow-300 opacity-20 blur-2xl rounded-full"></div>

    </section>
  );
}
