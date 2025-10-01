// src/components/Hero.jsx
import heroImg from "../assets/hero-students.svg"; // Students image
import copoweredLogo from "../assets/copowered.png"; // Co-powered logo

export default function Hero() {
  return (
    <section className="bg-white pt-15 pb-5 font-sans relative overflow-hidden min-h-[100vh]">
      <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-4 max-w-10xl h-full">
        {/* Left Content */}
        <div className="max-w-xl pr-10 -mt-10">
          {/* Co-powered */}
          <div className="flex items-center mb-4 space-x-2">
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full border">
              Co– Powered by:
            </span>
            <a
              href="https://agilityai.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black rounded-full p-1"
            >
              <img
                src={copoweredLogo}
                alt="Co Powered"
                className="h-6 w-6"
              />
            </a>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4">
            Mentorship,{" "}
            <span className="bg-green-500 text-white px-2 py-0.5 rounded inline-block transform -rotate-1 text-3xl md:text-4xl lg:text-5xl">
              Smarter
            </span>
            <br />
            <span className="text-gray-900">Exam Prep & Skills for</span>
            <br />
            <span
              className="text-green-600 font-bold italic"
              style={{ fontFamily: "cursive" }}
            >
              Future Ready You!
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 text-sm text-balance leading-relaxed mb-6">
            We guide students through every stage of learning from cracking
            competitive exams like <strong>CUET, IPMAT & CLAT</strong>, to career
            profiling, gamified skill-building with EduManiax, and
            capacity-building workshops for schools and colleges.
          </p>

          {/* CTA */}
          <a
            href="https://lyfshilpacademy.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 group text-sm"
          >
            Start Learning
            <span className="ml-2 text-lg group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-end items-center relative h-full">
          <div className="relative -mr-12 md:-mr-16 lg:-mr-20">
            <img
              src={heroImg}
              alt="Boy and girl students with backpacks and books giving thumbs up"
              className="w-auto h-96 md:h-[500px] lg:h-[600px] object-contain drop-shadow-0xl transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
