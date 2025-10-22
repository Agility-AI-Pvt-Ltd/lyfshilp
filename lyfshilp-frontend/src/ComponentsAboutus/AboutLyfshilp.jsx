import AboutImage from "../assets/Aboutimg/LyfshilpStudents.svg"; 

export default function AboutLyfshilp() {
  return (
    <section className="relative py-16 pt-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Heading */}
        <div className="text-center mb-12">
          <span className="text-gray-500 text-sm font-medium tracking-wide block">
            Our Story
          </span>
          <h2 className="text-5xl pt-2px font-extrabold text-gray-900 mt-2">
            About{" "}
            <span className="text-[#1DB954]">Lyfshilp Academy</span>
          </h2>
   <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto text-center px-4 sm:px-6">
  Mentorship-driven learning that prepares students for exams, careers, 
  and life — with AI-powered insights, skill-building courses, and 
  future-ready guidance.
  </p>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Image */}
          <div>
            <img
              src={AboutImage}
              alt="Lyfshilp Students"
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
          </div>

          {/* Right Text Box */}
          <div className="bg-[#004D1D] text-white rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-8 pb-4px leading-snug">
              Beyond Exams,
              <span className="bg-yellow-400 text-black px-5 rounded-md">
                Towards
              </span>{" "}
              Excellence
            </h3>
            <p className="text-gray-200 leading-relaxed">
              We believe education goes beyond exams. <br />
              Beyond Exams, Towards Excellence is our mission to prepare students 
              with AI-powered prep, mentorship and skills to succeed academically, 
              professionally and personally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
