import React from "react";

export default function OlympiadSection1b() {
  return (
    <section className="relative py-8 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#FFF8EE] overflow-hidden">
      {/* py-16 → py-10 */}

      <div className="max-w-5xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-12">
          {/* mb-12 → mb-6 */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 uppercase leading-snug">
            WHY INTERNATIONAL <span className="text-green-600 italic"> FUTUREX FELLOWSHIP? </span>
          </h3>

          <p className="mt-4 font-semibold text-gray-900 text-sm sm:text-base bg-yellow-100 inline-block px-4 py-1 rounded">
            {/* mt-3 → mt-2 */}
            Global Thought Leaders on Future-Ready Education
          </p>
        </div>

        {/* QUOTES */}
        <div className="space-y-4">
          {/* space-y-6 → space-y-4 */}

          {/* Larry Page */}
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-r-4 border-green-500 hover:shadow-lg transition-all flex gap-4">
            {/* p-6 → p-5 */}
            <img
              src="/images/larry_page.svg"
              alt="Larry Page"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                Larry Page
                <span className="block text-xs text-gray-500 font-medium">
                  Co-founder, Google | Former CEO, Alphabet
                </span>
              </h4>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic">
                {/* mt-2 → mt-1 */}
                “Education should encourage creativity and experimentation.”
              </p>
            </div>
          </div>

          {/* Barack Obama */}
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-blue-500  border-r-4 hover:shadow-lg transition-all flex gap-4">
            <img
              src="/images/Obama.svg"
              alt="Barack Obama"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                Barack Obama
                <span className="block text-xs text-gray-500 font-medium">
                  44th President of the United States
                </span>
              </h4>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic">
                “Education should prepare young people for jobs that don’t yet exist.”
              </p>
            </div>
          </div>

          {/* Bill Gates */}
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-purple-500  border-r-4 hover:shadow-lg transition-all flex gap-4">
            <img
              src="/images/Bill_Gates.svg"
              alt="Bill Gates"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                Bill Gates
                <span className="block text-xs text-gray-500 font-medium">
                  Co-founder, Microsoft | Co-chair, Bill & Melinda Gates Foundation
                </span>
              </h4>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic">
                “We need education systems that teach problem-solving and critical thinking.”
              </p>
            </div>
          </div>

          {/* Jensen Huang */}
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-orange-500  border-r-4 hover:shadow-lg transition-all flex gap-4">
            <img
              src="/images/Jensen_huang.svg"
              alt="Jensen Huang"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                Jensen Huang
                <span className="block text-xs text-gray-500 font-medium">
                  Founder & CEO, NVIDIA
                </span>
              </h4>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic">
                “Understanding how to work with AI will be essential for every profession.”
              </p>
            </div>
          </div>

          {/* Peter Thiel */}
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-emerald-600  border-r-4 hover:shadow-lg transition-all flex gap-4">
            <img
              src="/images/Peter_Theil.svg"
              alt="Peter Thiel"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                Peter Thiel
                <span className="block text-xs text-gray-500 font-medium">
                  Co-founder, PayPal | Entrepreneur & Investor
                </span>
              </h4>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic">
                “Education should teach people how to think, not what to think.”
              </p>
            </div>
          </div>

          {/* Falguni Nayar */}
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-pink-500  border-r-4 hover:shadow-lg transition-all flex gap-4">
            <img
              src="/images/Falguni_Nayar.svg"
              alt="Falguni Nayar"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                Falguni Nayar
                <span className="block text-xs text-gray-500 font-medium">
                  Founder & CEO, Nykaa
                </span>
              </h4>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic">
                “Modern careers demand adaptability and practical skills at every stage.”
              </p>
            </div>
          </div>

          {/* Sheryl Sandberg */}
          <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-indigo-500  border-r-4 hover:shadow-lg transition-all flex gap-4">
            <img
              src="/images/Sheryl_Sandberg.svg"
              alt="Sheryl Sandberg"
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                Sheryl Sandberg
                <span className="block text-xs text-gray-500 font-medium">
                  Former COO, Meta
                </span>
              </h4>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic">
                “Careers today require constant reinvention and skill building.”
              </p>
            </div>
          </div>

{/* FINAL HIGHLIGHT LINE */}
<div className="mt-8 flex justify-center">
  <div className="
    relative
    bg-white/70 backdrop-blur-sm
    px-6 py-4 rounded-xl
    shadow-lg
    ring-2 ring-yellow-400/70
    hover:ring-yellow-500
    transition-all
    max-w-3xl
  ">
    <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 italic text-center">
      International{" "}
      <span className="text-green-600 font-bold">FutureX Fellowship</span> is built to
      develop{" "}
      <span className="font-bold text-green-600">thinkers</span>,{" "}
      <span className="font-bold text-green-600">builders</span>, and{" "}
      <span className="font-bold text-green-600">leaders</span>{" "}
      for an AI-driven world.
    </p>

    {/* Soft Yellow Glow */}
    <span className="absolute -inset-1 rounded-xl bg-yellow-300/20 blur-xl -z-10"></span>
  </div>
</div>
        </div>
      </div>
      {/* Soft Background Decorations (tightened) */}
      <div className="absolute top-14 left-10 w-24 h-24 bg-green-200 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-14 right-12 w-28 h-28 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>
    </section>
  );
}
