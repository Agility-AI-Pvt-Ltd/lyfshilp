import { Link } from "react-router-dom";
import heroImg from "/hero-students.svg";
import copoweredLogo from "../assets/copowered.png";

export default function Hero() {
  return (
    <section className="bg-white pt-16 sm:pt-18 md:pt-20 pb-4 sm:pb-6 md:pb-10 font-sans relative overflow-hidden flex items-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[90vh]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-6 md:gap-10 max-w-7xl">

        {/* Left Content */}
        <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left order-2 md:order-1">
          
          {/* Co-powered */}
          <div className="flex justify-center md:justify-start items-center mb-2 sm:mb-3 md:mb-4 space-x-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full border">
              Co-Powered by:
            </span>
            <a
              href="https://agilityai.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black rounded-full p-1 hover:scale-110 transition-transform"
            >
              <img
                src={copoweredLogo}
                alt="Co Powered"
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
              />
            </a>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-2 sm:mb-3 md:mb-4">
            Mentorship that Builds{" "}
            <span className="bg-green-500 text-white px-2 py-0.5 rounded inline-block transform -rotate-1 text-xl sm:text-2xl md:text-3xl lg:text-5xl">
              Minds
            </span>{" "}
            <span className="text-gray-900 inline-block align-middle">
              Skills that
            </span>
            <br />
            <span
              className="text-green-600 font-bold italic inline-block mt-1"
              style={{ fontFamily: "cursive" }}
            >
              Future Ready
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6 text-center md:text-left max-w-lg mx-auto md:mx-0">
            Edumaniax is where learning meets play. We guide students from
            gamified skill-building and learning to cracking exams such as{" "}
            <strong>CUET, IPMAT & CLAT</strong>, discovering careers and
            organizing hands-on workshops for school and college students that
            prepare them for the future.
          </p>

          {/* CTA */}
          <div className="flex justify-center md:justify-start mt-3 sm:mt-4 md:mt-6">
            <Link
              to="/exam-prep"
              className="inline-flex items-center bg-green-600 text-white px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 group text-sm sm:text-base"
            >
              Start Learning
              <span className="ml-2 text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end items-center relative order-1 md:order-2">
          <div className="relative w-full sm:w-[90%] md:w-[100%] max-w-[580px] mx-auto aspect-auto md:aspect-[4/3]">
            <img
              src={heroImg}
              alt="Boy and girl students with backpacks and books giving thumbs up"
              loading="eager"
              decoding="sync"
              className="w-full h-auto md:h-full object-contain md:object-cover drop-shadow-xl transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-gradient-to-br from-green-100/40 via-transparent to-blue-100/30 rounded-full blur-3xl"></div>
          </div>
        </div>

      </div>
    </section>
  );
}