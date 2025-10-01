// src/components/InternWhy.jsx
import Frame1 from "../assets/internships/Frame1.svg";
import Frame2 from "../assets/internships/Frame2.svg";

export default function InternWhy() {
  return (
    <section className="pt-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left mb-16">
          <h2 className="text-2xl md:text-4xl font-bold">
            Why interning with us is{" "}
            <span className="text-green-600">More Than Just Experience?</span>
          </h2>
          <p className="text-gray-600 max-w-md mt-4 md:mt-0">
            You’ll gain practical skills, contribute to meaningful initiatives,
            and grow into a future-ready professional.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <div className="bg-yellow-50 rounded-xl shadow-md p-8 flex items-center gap-6 hover:shadow-lg transition">
            <img
              src={Frame1}
              alt="Pathway to Conversion"
              className="w-40 h-auto object-contain flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold text-xl mb-3">
                Pathway to Conversion
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Outstanding interns can convert into long-term roles with Lyfshilp
                Academy.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-green-50 rounded-xl shadow-md p-8 flex items-center gap-6 hover:shadow-lg transition">
            <img
              src={Frame2}
              alt="From Classroom to Career"
              className="w-40 h-auto object-contain flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold text-xl mb-3">
                From Classroom to Career
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Work on live projects that turn academic knowledge into real-world
                impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
