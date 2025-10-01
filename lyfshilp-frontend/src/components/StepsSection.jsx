import Step1Icon from "../assets/stepsections/step1.svg";
import Step2Icon from "../assets/stepsections/step2.svg";
import Step3Icon from "../assets/stepsections/step3.svg";

export default function StepsSection() {
  return (
    <section className="py-10 bg-white font-poppins relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
          Discover, Attempt{" "}
          <span className="text-green-600">&amp; Learn Smarter</span>
        </h2>
        <p className="mt-4 text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Follow these simple steps to test your skills, get{" "}
          <span className="font-medium">AI-powered feedback</span>, and
          improve faster with insightful analytics.
        </p>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Dotted connector (only between icons) */}
          <svg
            className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 w-[70%] h-20 z-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C150,0 350,80 600,40 C850,0 1050,80 1200,40"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeDasharray="6,6"
              strokeLinecap="round"
            />
          </svg>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="p-5 rounded-2xl bg-green-50 shadow-sm">
                <img src={Step1Icon} alt="Step 1" className="h-14 w-14" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                1. Choose Olympiad Subject
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed max-w-xs">
                Pick from a wide range of Olympiads and skill-based challenges
                across subjects like Math, Science, Logic and more.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="p-5 rounded-2xl bg-green-50 shadow-sm">
                <img src={Step2Icon} alt="Step 2" className="h-14 w-14" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                2. Attempt Free Quizzes
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed max-w-xs">
                Take practice tests and timed challenges modeled on real
                Olympiad formats to sharpen speed &amp; accuracy.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="p-5 rounded-2xl bg-green-50 shadow-sm">
                <img src={Step3Icon} alt="Step 3" className="h-14 w-14" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                3. Get Insights &amp; Improve
              </h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed max-w-xs">
                Access detailed performance analytics understand your
                strengths, work on weak areas, and track your growth over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
