import TopWave from "../assets/Aboutimg/topwave.svg";   // green wali
import BottomWave from "../assets/Aboutimg/bottomwave.svg"; // orange wali

export default function SuccessNumbers() {
  return (
    <section className="relative bg-[#FFF9F0] py-20 overflow-hidden">
      {/* Background Waves */}
      <div className="absolute top-0 left-0 w-1/4 z-0">
        <img src={TopWave} alt="Top Wave Design" className="w-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-1/4 z-0">
        <img src={BottomWave} alt="Bottom Wave Design" className="w-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold text-gray-900">
            Our success{" "}
            <span className="text-[#1DB954]">by the numbers</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-center leading-relaxed">
            Empowering students with AI-driven exam prep, Olympiad training,
            mentorship and workshops.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">2,000+</h3>
            <p className="mt-2 text-sm text-gray-600">
              Students guided <br />
              Through exam prep, mentorship and skill-building programs across India.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">85%</h3>
            <p className="mt-2 text-sm text-gray-600">
              Improvement rate <br />
              Students show measurable growth in performance with structured mentoring.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">50+</h3>
            <p className="mt-2 text-sm text-gray-600">
              Olympiad challenges & quizzes <br />
              Designed to sharpen reasoning, problem-solving and subject knowledge.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">250+</h3>
            <p className="mt-2 text-sm text-gray-600">
              Workshops conducted <br />
              AI, ICT, and gamified learning sessions delivered nationwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
